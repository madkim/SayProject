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

const ListSayings: React.FC = () => {
  const dispatch = useDispatch();
  const [present] = useIonAlert();

  const [playing, setPlaying] = useState(false);
  const [searchText, setSearchtext] = useState("");
  const [wavesurfers, setWavesurfers] = useState<any>({});
  const [selectedSaying, setSelectedSaying] = useState("");

  const sayings = useSelector((state: RootState) => state.saying.sayings);
  const allSayings = useSelector((state: RootState) => state.saying.allSayings);

  useEffect(() => {
    dispatch({ type: setConstants.SET_INIT_STATE, payload: "" });
  }, []);

  useEffect(() => {
    dispatch(sayingActions.getAllSayings());
  }, [sayings]);

  useEffect(() => {
    createWavesurfers();
  }, [allSayings]);

  const createWavesurfers = () => {
    let wavesurfer: any = {};
    allSayings.forEach((saying: Saying) => {
      if (saying.hasRecording === true && !(saying.id in wavesurfers)) {
        createWavesurfer(saying, wavesurfer);
      }
    });
    setWavesurfers({ ...wavesurfers, ...wavesurfer });
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
            const saying = allSayings.find(
              (saying: Saying) => saying.id === sayingId
            );
            dispatch(sayingActions.deleteSayingRecording(sayingId, saying.set));
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
    const saying = allSayings.find((saying: Saying) => saying.id === sayingId);

    dispatch(
      sayingActions.saveSayingRecording(recording, sayingId, saying.set)
    );

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
                  sayings={allSayings}
                  playing={playing}
                  selected={selectedSaying}
                  container="list-waveform"
                  wavesurfers={wavesurfers}
                  setPlaying={setPlaying}
                  setSelected={setSelectedSaying}
                  saveRecording={saveRecording}
                  deleteRecording={deleteRecording}
                />
                {/* <IonList>
                  {Object.keys(allSayings).length > 0 &&
                    allSayings
                      .filter((saying: Saying) =>
                        search !== ""
                          ? saying.saying
                              .toLowerCase()
                              .trim()
                              .includes(search.toLowerCase().trim())
                          : saying
                      )
                      .map((saying: Saying) => {
                        return (
                          <IonItem
                            key={saying.id}
                            detail
                            button
                            routerLink={`/view/${saying.id}`}
                          >
                            <IonLabel className="ion-padding-vertical">
                              <IonRow>
                                <IonCol size="auto">
                                  <small>
                                    {moment(saying.createdAt).format(
                                      "MMM Do YYYY"
                                    )}
                                  </small>
                                </IonCol>

                                {saying.hasRecording === false && (
                                  <IonCol>
                                    <small>
                                      <IonNote color="danger">
                                        &nbsp;No Recording
                                      </IonNote>
                                    </small>
                                  </IonCol>
                                )}
                              </IonRow>

                              <IonRow>
                                <IonCol>
                                  <div className="ion-text-wrap">
                                    <h1>{saying.saying}</h1>
                                  </div>
                                </IonCol>
                              </IonRow>

                              <IonRow>
                                <IonCol className="ion-text-wrap">
                                  <small>
                                    <b>Set:</b> {saying.setName}
                                  </small>
                                </IonCol>
                              </IonRow>
                            </IonLabel>
                          </IonItem>
                        );
                      })}
                </IonList> */}
              </IonCol>
            </IonRow>
          </IonGrid>
        </FadeIn>
      </IonContent>
    </IonPage>
  );
};

export default ListSayings;
