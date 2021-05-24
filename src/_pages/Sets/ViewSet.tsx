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
} from "@ionic/react";

import Ask from "../Sayings/AskSaying";
import WaveSurfer from "wavesurfer.js";
import SayingCards from "../Sayings/SayingCards";
import SearchSayings from "../Sayings/SearchSayings";

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
      dispatch({ type: sayingConstants.SET_INIT_STATE, payload: "" });
    };
  }, []);

  useEffect(() => {
    createWavesurfers();
  }, [sayings]);

  const createWavesurfers = () => {
    let wavesurfer: any = {};
    sayings.forEach((saying: Saying) => {
      if (saying.hasRecording === true && !(saying.id in wavesurfers)) {
        createWavesurfer(saying, wavesurfer);
      }
    });
    setWavesurfers({ ...wavesurfers, ...wavesurfer });
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
            dispatch(sayingActions.deleteSayingRecording(sayingId, set.id));
            wavesurfers[sayingId].destroy();
            const updatedWavesurfers = { ...wavesurfers };
            delete updatedWavesurfers[sayingId];
            setWavesurfers(updatedWavesurfers);
          },
        },
        "Cancel",
      ],
    });
  };

  const saveRecording = (recording: string, sayingId: string) => {
    dispatch(sayingActions.saveSayingRecording(recording, sayingId, set.id));

    const saying = sayings.find((saying: Saying) => saying.id === sayingId);
    const sayingWithRecording = {
      id: saying.id,
      set: saying.set,
      owner: saying.owner,
      saying: saying.saying,
      setName: saying.setName,
      createdAt: saying.createdAt,
      recording: recording,
      hasRecording: true,
    };
    const wavesurfer = createWavesurfer(sayingWithRecording, {});
    setWavesurfers({ ...wavesurfers, ...wavesurfer });
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

            <IonButton slot="end" onClick={() => setSearch(!search)}>
              <IonIcon icon={search ? close : searchOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonLoading
          isOpen={loading}
          message={"Please wait..."}
          duration={5000}
        />

        <div className={search === true ? "" : "ion-hide"}>
          <SearchSayings sayings={sayings} />
        </div>

        <div className={search === true ? "ion-hide" : ""}>
          <Ask addNewSaying={addNewSaying} />
          <SayingCards
            setId={id}
            sayings={sayings}
            playing={playing}
            selected={selectedSaying}
            wavesurfers={wavesurfers}
            setPlaying={setPlaying}
            setSelected={setSelectedSaying}
            saveRecording={saveRecording}
            deleteRecording={deleteRecording}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewSet;
