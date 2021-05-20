import {
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonIcon,
  IonButton,
  IonSpinner,
  IonCardHeader,
} from "@ionic/react";

import { caretForwardCircle, stopCircle, trash } from "ionicons/icons";

import { Saying } from "../../_helpers/types";
import { Plugins } from "@capacitor/core";
import { useHistory } from "react-router-dom";
import { RecordingData, GenericResponse } from "capacitor-voice-recorder";
import { ReactElement, useState, useEffect } from "react";

import WaveSurfer from "wavesurfer.js";

interface Props {
  sayings: Saying[];
}

export default function SayingCards(props: Props): ReactElement {
  const history = useHistory();
  const { VoiceRecorder } = Plugins;

  const [sayings, setSayings] = useState(props.sayings);
  const [recording, setRecording] = useState(false);
  const [wavesurfers, setWavesurfers] = useState<any>("");
  const [selectedSaying, setSelectedSaying] = useState("");

  useEffect(() => {
    setSayings(props.sayings);
  }, []);

  const listen = (id: string) => {
    // Listen to Recording
    wavesurfers[id].play();
  };

  const record = (id: string) => {
    if (recording) {
      if (selectedSaying !== id) {
        alert("Another recording already in progress!");
      } else {
        setRecording(false);
        setSelectedSaying("");
        VoiceRecorder.stopRecording()
          .then((result: RecordingData) => {
            const wavesurfer = WaveSurfer.create({
              container: `#waveform-${id}`,
            });

            wavesurfer.load(
              `data:audio/aac;base64,${result.value.recordDataBase64}`
            );

            setWavesurfers({ ...wavesurfers, [id]: wavesurfer });

            let updateSaying = sayings.find((saying) => saying.id === id);
            const updatedSayings = sayings.filter((saying) => saying.id !== id);

            if (updateSaying) {
              updateSaying["hasRecording"] = true;
              setSayings([...updatedSayings, { ...updateSaying }]);
            }
          })
          .catch((error) => console.log(error));
      }
    } else {
      setRecording(true);
      setSelectedSaying(id);
      VoiceRecorder.startRecording()
        .then((result: GenericResponse) => console.log(result.value))
        .catch((error) => console.log(error));
    }
  };

  const deleteRecording = () => {
    // delete recording
    const answer = window.confirm(
      "Are you sure you want to delete this recording?"
    );
  };

  return (
    <>
      {Object.keys(sayings).length > 0 &&
        sayings.map((saying) => {
          return (
            <IonCard key={saying.id}>
              <IonCardHeader style={{ fontSize: "large", fontWeight: "700" }}>
                <IonRow>
                  <IonCol onClick={() => history.push(`/view/${saying.id}`)}>
                    <IonText color="dark">{saying.saying}</IonText>
                  </IonCol>
                  <IonCol size="auto">
                    {saying.hasRecording ? (
                      <IonButton
                        color="danger"
                        fill="outline"
                        expand="block"
                        onClick={deleteRecording}
                      >
                        <IonIcon icon={trash} />
                      </IonButton>
                    ) : (
                      <IonButton
                        fill="outline"
                        color="danger"
                        expand="block"
                        onClick={() => record(saying.id)}
                      >
                        {recording && selectedSaying === saying.id ? (
                          <IonSpinner color="danger" name="bubbles" />
                        ) : (
                          <IonIcon icon={stopCircle} />
                        )}
                      </IonButton>
                    )}
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonRow>
                      <IonCol>
                        <div id={`waveform-${saying.id}`}></div>
                      </IonCol>
                      <IonCol size="auto" className="ion-no-padding">
                        <IonButton
                          color="success"
                          fill="outline"
                          expand="block"
                          onClick={() => listen(saying.id)}
                        >
                          <IonIcon icon={caretForwardCircle} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonCardHeader>
            </IonCard>
          );
        })}
    </>
  );
}
