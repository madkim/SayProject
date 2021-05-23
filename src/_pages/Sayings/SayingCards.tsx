import { Saying } from "../../_helpers/types";
import { Plugins } from "@capacitor/core";
import { useHistory } from "react-router-dom";
import { ReactElement, useState } from "react";
import { RecordingData, GenericResponse } from "capacitor-voice-recorder";
import { IonRow, IonCol, IonText, IonCard, IonCardHeader } from "@ionic/react";

import PlayPauseButton from "../../_stories/PlayPauseButton";
import RecordDeleteButton from "../../_stories/RecordDeleteButton";

interface Props {
  setId: string;
  sayings: Saying[];
  playing: boolean;
  wavesurfers: any;
  setPlaying: (value: boolean) => void;
  saveRecording: (audio: any, sayingId: string) => void;
}

export default function SayingCards(props: Props): ReactElement {
  const history = useHistory();
  const { VoiceRecorder } = Plugins;
  const [recording, setRecording] = useState(false);
  const [selectedSaying, setSelectedSaying] = useState("");

  const listen = (id: string) => {
    if (selectedSaying !== "" && selectedSaying !== id) {
      props.wavesurfers[selectedSaying].stop();
      setSelectedSaying(id);
      props.setPlaying(true);
      props.wavesurfers[id].play();
    } else {
      setSelectedSaying(id);
      if (props.playing === true) {
        props.setPlaying(false);
        props.wavesurfers[id].pause();
      } else {
        props.setPlaying(true);
        props.wavesurfers[id].play();
      }
    }
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
            const audio = `data:audio/aac;base64,${result.value.recordDataBase64}`;
            props.saveRecording(audio, id);
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

  const deleteRecording = (id: string) => {
    const answer = window.confirm(
      "Are you sure you want to delete this recording?"
    );
  };

  return (
    <>
      {Object.keys(props.sayings).length > 0 &&
        props.sayings.map((saying) => {
          return (
            <IonCard key={saying.id}>
              <IonCardHeader style={{ fontSize: "large", fontWeight: "700" }}>
                <IonRow>
                  <IonCol onClick={() => history.push(`/view/${saying.id}`)}>
                    <IonText color="dark">{saying.saying}</IonText>
                  </IonCol>
                  <IonCol size="auto">
                    <RecordDeleteButton
                      id={saying.id}
                      record={record}
                      recording={recording}
                      hasRecording={saying.hasRecording}
                      selectedSaying={selectedSaying}
                      deleteRecording={deleteRecording}
                    />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonRow>
                      <IonCol>
                        <div id={`waveform-${saying.id}`}></div>
                      </IonCol>
                      {saying.hasRecording && (
                        <IonCol size="auto" className="ion-no-padding">
                          <PlayPauseButton
                            id={saying.id}
                            listen={listen}
                            playing={props.playing}
                            selectedSaying={selectedSaying}
                          />
                        </IonCol>
                      )}
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
