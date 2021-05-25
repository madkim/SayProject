import { Saying } from "../../_helpers/types";
import { Plugins } from "@capacitor/core";
import { useHistory } from "react-router-dom";
import { ReactElement, useState } from "react";
import { RecordingData, GenericResponse } from "capacitor-voice-recorder";
import { IonRow, IonCol, IonText, IonCard, IonCardHeader } from "@ionic/react";

import FadeIn from "react-fade-in";
import PlayPauseButton from "../../_stories/PlayPauseButton";
import RecordDeleteButton from "../../_stories/RecordDeleteButton";

interface Props {
  setId: string;
  search: string;
  sayings: Saying[];
  playing: boolean;
  selected: string;
  wavesurfers: any;
  setPlaying: (value: boolean) => void;
  setSelected: (value: string) => void;
  saveRecording: (audio: any, sayingId: string) => void;
  deleteRecording: (sayingId: string) => void;
}

export default function SayingCards(props: Props): ReactElement {
  const history = useHistory();
  const { VoiceRecorder } = Plugins;
  const [recording, setRecording] = useState(false);

  const listen = (id: string) => {
    if (props.selected !== "" && props.selected !== id) {
      props.wavesurfers[props.selected].stop();
      props.setSelected(id);
      props.setPlaying(true);
      props.wavesurfers[id].play();
    } else {
      props.setSelected(id);
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
      if (props.selected !== id) {
        alert("Another recording already in progress!");
      } else {
        setRecording(false);
        props.setSelected("");
        VoiceRecorder.stopRecording()
          .then((result: RecordingData) => {
            const audio = `data:audio/aac;base64,${result.value.recordDataBase64}`;
            props.saveRecording(audio, id);
          })
          .catch((error: Error) => console.log(error));
      }
    } else {
      setRecording(true);
      props.setSelected(id);
      VoiceRecorder.startRecording()
        .then((result: GenericResponse) => console.log(result.value))
        .catch((error: Error) => console.log(error));
    }
  };

  const searchSayings = (saying: Saying) => {
    return props.search !== "" &&
      saying.saying
        .toLowerCase()
        .trim()
        .includes(props.search.toLowerCase().trim()) === false
      ? "ion-hide"
      : "";
  };

  return (
    <FadeIn>
      {Object.keys(props.sayings).length > 0 &&
        props.sayings.map((saying) => {
          return (
            <IonCard key={saying.id} className={searchSayings(saying)}>
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
                      hasRecording={saying.id in props.wavesurfers}
                      selectedSaying={props.selected}
                      deleteRecording={props.deleteRecording}
                    />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonRow>
                      <IonCol>
                        <div id={`waveform-${saying.id}`}></div>
                      </IonCol>
                      {saying.id in props.wavesurfers && (
                        <IonCol size="auto" className="ion-no-padding">
                          <PlayPauseButton
                            id={saying.id}
                            listen={listen}
                            playing={props.playing}
                            selectedSaying={props.selected}
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
    </FadeIn>
  );
}
