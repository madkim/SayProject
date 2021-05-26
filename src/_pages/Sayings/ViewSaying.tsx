import {
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonPage,
  IonIcon,
  IonGrid,
  IonList,
  IonTitle,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonLoading,
  IonSpinner,
  useIonAlert,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";

import { Plugins } from "@capacitor/core";
import { useParams } from "react-router";
import { RootState } from "../../_reducers/rootReducer";
import { NavContext } from "@ionic/react";
import { sayingActions } from "../../_actions/sayingActions";
import { useSelector, useDispatch } from "react-redux";
import { chevronBack, stopCircleSharp } from "ionicons/icons";
import { RecordingData, GenericResponse } from "capacitor-voice-recorder";
import { ReactElement, useEffect, useContext, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import EditButton from "../../_stories/EditButton";
import PlayPauseButton from "../../_stories/PlayPauseButton";
import { Saying } from "../../_helpers/types";

interface Props {}

export default function ViewSaying({}: Props): ReactElement {
  const { id } = useParams<{ id: string }>();
  const [present] = useIonAlert();
  const { goBack } = useContext(NavContext);
  const { VoiceRecorder } = Plugins;

  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [wavesurfer, setWavesurfer] = useState<any>(null);

  const dispatch = useDispatch();
  const set = useSelector((state: RootState) => state.set.currentSet);
  const saying = useSelector((state: RootState) => state.saying.saying);
  const loading = useSelector((state: RootState) => state.saying.loading);

  useEffect(() => {
    dispatch(sayingActions.getSayingById(id));
  }, []);

  useEffect(() => {
    if (
      saying.hasRecording === true &&
      wavesurfer === null &&
      saying.id === id
    ) {
      createWavesurfer(saying);
    }
  }, [saying]);

  const createWavesurfer = (saying: Saying) => {
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      barWidth: 2,
    });
    wavesurfer.load(saying.recording);

    wavesurfer.on("finish", function () {
      setPlaying(false);
    });
    setWavesurfer(wavesurfer);
  };

  const deleteSaying = () => {
    present({
      header: "Delete Saying",
      message: "Are you sure you want to delete this saying?",
      buttons: [
        {
          text: "Ok",
          handler: (d) => {
            dispatch(
              sayingActions.deleteSayingById(id, set.id, saying.hasRecording)
            );
            goBack(`/set/${set.id}`);
          },
        },
        "Cancel",
      ],
    });
  };

  const addRecording = () => {
    if (recording) {
      setRecording(false);
      VoiceRecorder.stopRecording()
        .then((result: RecordingData) => {
          const audio = `data:audio/aac;base64,${result.value.recordDataBase64}`;
          saveRecording(audio, id);
        })
        .catch((error: Error) => console.log(error));
    } else {
      setRecording(true);
      VoiceRecorder.startRecording()
        .then((result: GenericResponse) => console.log(result.value))
        .catch((error: Error) => console.log(error));
    }
  };

  const saveRecording = (recording: string, sayingId: string) => {
    dispatch(
      sayingActions.saveSayingRecording(recording, sayingId, set.id, false)
    );
  };

  const listen = (id: string) => {
    if (playing === true) {
      setPlaying(false);
      wavesurfer.pause();
    } else {
      setPlaying(true);
      wavesurfer.play();
    }
  };

  const back = () => {
    set.id ? goBack(`/set/${set.id}`) : goBack("/list");
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start" className="ion-padding">
              <IonButton onClick={back}>
                <IonIcon icon={chevronBack} />
              </IonButton>
            </IonButtons>

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <EditButton slot="end" deleteItem={deleteSaying} />
          </IonToolbar>
        </IonHeader>

        <IonLoading
          isOpen={loading}
          message={"Please wait..."}
          duration={5000}
        />

        <div style={{ height: window.screen.height / 1.5 }}>
          <IonCard>
            <IonCardHeader color="light" style={{ fontSize: "large" }}>
              How do you say:
            </IonCardHeader>
            <IonCardContent>
              <br />
              <IonText color="dark">
                <h1>{saying && saying.saying}</h1>
              </IonText>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader color="light" style={{ fontSize: "large" }}>
              Recording:
            </IonCardHeader>
            <IonCardContent>
              <br />
              <IonList>
                <IonRow>
                  <IonCol>
                    <div id="waveform"></div>
                  </IonCol>
                </IonRow>
                <br />
                {wavesurfer !== null ? (
                  <IonRow>
                    <IonCol>
                      <IonButton color="danger" expand="block" fill="outline">
                        <IonIcon icon={stopCircleSharp} /> &nbsp;Re-Record
                      </IonButton>
                    </IonCol>
                    <IonCol size="6">
                      <PlayPauseButton
                        id={saying.id}
                        listen={listen}
                        playing={playing}
                        selectedSaying={saying.id}
                      />
                    </IonCol>
                  </IonRow>
                ) : (
                  <IonRow>
                    <IonCol>
                      <IonButton
                        color="danger"
                        expand="block"
                        fill="outline"
                        onClick={addRecording}
                      >
                        {recording ? (
                          <IonSpinner color="danger" name="bubbles" />
                        ) : (
                          <>
                            <IonIcon icon={stopCircleSharp} />
                            <span>&nbsp;Add Recording</span>
                          </>
                        )}
                      </IonButton>
                    </IonCol>
                  </IonRow>
                )}
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                fill="outline"
                color="primary"
                expand="block"
                className="ion-padding-horizontal"
                onClick={back}
              >
                Done
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
