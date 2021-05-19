import {
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonIcon,
  IonButton,
  IonCardHeader,
  IonSpinner,
} from "@ionic/react";

import { caretForwardCircle, stopCircle } from "ionicons/icons";

import { Saying } from "../../_helpers/types";
import { Plugins } from "@capacitor/core";
import { useHistory } from "react-router-dom";
import { ReactElement, useState } from "react";
import { RecordingData, GenericResponse } from "capacitor-voice-recorder";

interface Props {
  sayings: Saying[];
}

export default function SayingCards({ sayings }: Props): ReactElement {
  const history = useHistory();
  const { VoiceRecorder } = Plugins;

  const [recording, setRecording] = useState(false);
  const [selectedSaying, setSelectedSaying] = useState("");

  const listen = () => {
    // Listen to Recording
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
            console.log(result.value);
            const audioRef = new Audio(
              `data:audio/aac;base64,${result.value.recordDataBase64}`
            );
            audioRef.oncanplaythrough = () => audioRef.play();
            audioRef.load();
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
                        color="success"
                        fill="outline"
                        expand="block"
                        onClick={listen}
                      >
                        <IonIcon icon={caretForwardCircle} />
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
              </IonCardHeader>
            </IonCard>
          );
        })}
    </>
  );
}
