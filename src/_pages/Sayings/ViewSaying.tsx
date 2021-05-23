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
  IonCardHeader,
  IonCardContent,
  IonLoading,
} from "@ionic/react";

import { useParams } from "react-router";
import { RootState } from "../../_reducers/rootReducer";
import { NavContext } from "@ionic/react";
import { sayingActions } from "../../_actions/sayingActions";
import { useSelector, useDispatch } from "react-redux";
import { chevronBack, stopCircleSharp } from "ionicons/icons";
import { ReactElement, useEffect, useContext, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import EditButton from "../../_stories/EditButton";
import PlayPauseButton from "../../_stories/PlayPauseButton";

interface Props {}

export default function ViewSaying({}: Props): ReactElement {
  const { id } = useParams<{ id: string }>();
  const { goBack } = useContext(NavContext);

  const [playing, setPlaying] = useState(false);
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
      const wavesurfer = WaveSurfer.create({
        container: "#waveform",
        barWidth: 2,
      });
      wavesurfer.load(saying.recording);

      wavesurfer.on("finish", function () {
        setPlaying(false);
      });
      setWavesurfer(wavesurfer);
    }
  }, [saying]);

  const deleteSaying = () => {
    const answer = window.confirm("Are you sure you want to delete?");

    if (answer) {
      dispatch(sayingActions.deleteSayingById(id));
      goBack(`/set/${set.id}`);
    }
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
              {saying.hasRecording ? (
                <IonList>
                  <IonRow>
                    <IonCol>
                      <div id="waveform"></div>
                    </IonCol>
                  </IonRow>
                  <br />
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
                </IonList>
              ) : (
                <IonList>
                  <IonRow>
                    <IonCol>
                      <IonButton color="danger" expand="block" fill="outline">
                        <IonIcon icon={stopCircleSharp} /> &nbsp;Add Recording
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonList>
              )}
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
