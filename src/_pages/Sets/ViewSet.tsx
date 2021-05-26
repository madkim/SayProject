import {
  IonPage,
  IonIcon,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonToolbar,
  IonLoading,
  useIonAlert,
  IonSearchbar,
  useIonViewWillLeave,
} from "@ionic/react";

import Ask from "../Sayings/AskSaying";
import FadeIn from "react-fade-in";
import WaveSurfer from "wavesurfer.js";
import SayingCards from "../Sayings/SayingCards";

import { Saying } from "../../_helpers/types";
import { useParams } from "react-router";
import { RootState } from "../../_reducers/rootReducer";
import { NavContext } from "@ionic/react";
import { setActions } from "../../_actions/setActions";
import { sayingActions } from "../../_actions/sayingActions";
import { sayingConstants } from "../../_constants/sayingConstants";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { chevronBack, close, searchOutline } from "ionicons/icons";

const ViewSet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [present] = useIonAlert();
  const { goBack } = useContext(NavContext);

  const [search, setSearch] = useState(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [searchText, setSearchtext] = useState("");
  const [wavesurfers, setWavesurfers] = useState<any>({});
  const [selectedSaying, setSelectedSaying] = useState("");

  const dispatch = useDispatch();
  const set = useSelector((state: RootState) => state.set.currentSet);
  const loading = useSelector((state: RootState) => state.set.loading);
  const sayings = useSelector((state: RootState) => state.saying.sayings);

  useEffect(() => {
    dispatch(setActions.getSetById(id));
    dispatch(sayingActions.getSayingsBySetId(id));

    return () => {
      dispatch({ type: sayingConstants.SET_SAYINGS_INIT_STATE, payload: "" });
    };
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
      container: `#waveform-${saying.id}`,
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
            dispatch(
              sayingActions.deleteSayingRecording(sayingId, set.id, false)
            );
          },
        },
        "Cancel",
      ],
    });
  };

  const saveRecording = (recording: string, sayingId: string) => {
    dispatch(
      sayingActions.saveSayingRecording(recording, sayingId, set.id, false)
    );
  };

  const addNewSaying = (saying: string) => {
    dispatch(sayingActions.addNewSaying(saying, set.id));
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start" className="ion-padding">
              <IonButton onClick={() => goBack(`/set/${id}`)}>
                <IonIcon icon={chevronBack} />
              </IonButton>
            </IonButtons>

            <h2>{set.name}</h2>

            <IonButton
              slot="end"
              onClick={() => {
                if (search) setSearchtext("");
                setSearch(!search);
              }}
            >
              <IonIcon icon={search ? close : searchOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonLoading
          isOpen={loading}
          message={"Please wait..."}
          duration={5000}
        />

        <FadeIn>
          {search ? (
            <IonSearchbar
              value={searchText}
              style={{ marginTop: "2em" }}
              className="ion-padding-horizontal"
              onIonChange={(e) => setSearchtext(e.detail.value!)}
            ></IonSearchbar>
          ) : (
            <Ask addNewSaying={addNewSaying} />
          )}
        </FadeIn>

        <SayingCards
          setId={id}
          search={searchText}
          sayings={sayings}
          playing={playing}
          container="waveform"
          selected={selectedSaying}
          wavesurfers={wavesurfers}
          setPlaying={setPlaying}
          setSelected={setSelectedSaying}
          saveRecording={saveRecording}
          deleteRecording={deleteRecording}
        />
      </IonContent>
    </IonPage>
  );
};

export default ViewSet;
