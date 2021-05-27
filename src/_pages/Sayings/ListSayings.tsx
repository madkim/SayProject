import {
  IonRow,
  IonCol,
  IonGrid,
  IonPage,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
  useIonAlert,
  IonSearchbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";

import { Saying } from "../../_helpers/types";
import { RootState } from "../../_reducers/rootReducer";
import { setConstants } from "../../_constants/setConstants";
import { notifications } from "ionicons/icons";
import { sayingActions } from "../../_actions/sayingActions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import FadeIn from "react-fade-in";
import WaveSurfer from "wavesurfer.js";
import SayingCards from "./SayingCards";
import UserProfileButton from "../../_stories/UserProfileButton";
import { sayingConstants } from "../../_constants/sayingConstants";

const ListSayings: React.FC = () => {
  const dispatch = useDispatch();
  const [present] = useIonAlert();

  const [playing, setPlaying] = useState(false);
  const [searchText, setSearchtext] = useState("");
  const [wavesurfers, setWavesurfers] = useState<any>({});
  const [selectedSaying, setSelectedSaying] = useState("");

  const sayings = useSelector((state: RootState) => state.saying.sayings);
  const loading = useSelector((state: RootState) => state.saying.loading);

  useIonViewWillEnter(() => {
    dispatch(sayingActions.getAllSayings());
  });

  useIonViewWillLeave(() => {
    dispatch({ type: sayingConstants.SET_SAYINGS_INIT_STATE, payload: "" });
  });

  useEffect(() => {
    dispatch(sayingActions.getAllSayings());
  }, []);

  useEffect(() => {
    createWavesurfers();
  }, [sayings]);

  const createWavesurfers = () => {
    Object.keys(wavesurfers).map((id) => {
      wavesurfers[id].destroy();
    });
    let wavesurfer: any = {};
    sayings.forEach((saying: Saying) => {
      if (saying.hasRecording === true) {
        createWavesurfer(saying, wavesurfer);
      }
    });
    setWavesurfers(wavesurfer);
  };

  const createWavesurfer = (saying: Saying, wavesurfer: any) => {
    wavesurfer[saying.id] = WaveSurfer.create({
      container: `#list-waveform-${saying.id}`,
      barWidth: 2,
      height: 40,
    });
    wavesurfer[saying.id].load(saying.recording);
    wavesurfer[saying.id].on("finish", function () {
      setPlaying(false);
    });
    return wavesurfer;
  };

  const deleteRecording = (sayingId: string) => {
    present({
      header: "Delete Recording",
      message: "Are you sure you want to delete this recording?",
      buttons: [
        {
          text: "Ok",
          handler: (d) => {
            const saying = sayings.find(
              (saying: Saying) => saying.id === sayingId
            );
            dispatch(
              sayingActions.deleteSayingRecording(sayingId, saying.set, true)
            );
          },
        },
        "Cancel",
      ],
    });
  };

  const saveRecording = (recording: string, sayingId: string) => {
    const saying = sayings.find((saying: Saying) => saying.id === sayingId);
    dispatch(
      sayingActions.saveSayingRecording(recording, sayingId, saying.set, true)
    );
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButton size="large" slot="start">
              <IonIcon icon={notifications} />
            </IonButton>

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <UserProfileButton slot="end" />
          </IonToolbar>
        </IonHeader>

        <FadeIn>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonSearchbar
                  value={searchText}
                  onIonChange={(e) => setSearchtext(e.detail.value!)}
                ></IonSearchbar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <SayingCards
                  setId={""}
                  search={searchText}
                  sayings={sayings}
                  playing={playing}
                  loading={loading}
                  selected={selectedSaying}
                  container="list-waveform"
                  wavesurfers={wavesurfers}
                  setPlaying={setPlaying}
                  setSelected={setSelectedSaying}
                  saveRecording={saveRecording}
                  deleteRecording={deleteRecording}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </FadeIn>
      </IonContent>
    </IonPage>
  );
};

export default ListSayings;
