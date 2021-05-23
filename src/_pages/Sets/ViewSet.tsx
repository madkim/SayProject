import {
  IonPage,
  IonIcon,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonToolbar,
  IonLoading,
} from "@ionic/react";

import Ask from "../Sayings/AskSaying";
import FadeIn from "react-fade-in";
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
  const { goBack } = useContext(NavContext);

  const [search, setSearch] = useState(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [wavesurfers, setWavesurfers] = useState<any>({});

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

  const saveRecording = (recording: string, sayingId: string) => {
    dispatch(sayingActions.saveSayingRecording(recording, sayingId, set.id));
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
            wavesurfers={wavesurfers}
            setPlaying={setPlaying}
            saveRecording={saveRecording}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ViewSet;
