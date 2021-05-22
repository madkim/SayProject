import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonNote,
  IonGrid,
  IonPage,
  IonIcon,
  IonLabel,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
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
import UserProfileButton from "../../_stories/UserProfileButton";

const ListSayings: React.FC = () => {
  const dispatch = useDispatch();
  const sayings = useSelector((state: RootState) => state.saying.sayings);
  const allSayings = useSelector((state: RootState) => state.saying.allSayings);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(sayingActions.getAllSayings());
    dispatch({ type: setConstants.SET_INIT_STATE, payload: "" });
  }, [sayings]);

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
                  onIonChange={(e) => setSearchText(e.detail.value!)}
                ></IonSearchbar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonList>
                  {Object.keys(allSayings).length > 0 &&
                    allSayings.map((saying: Saying) => {
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
                                  <b>Set:</b> Chinese words and phrases
                                </small>
                              </IonCol>
                            </IonRow>
                          </IonLabel>
                        </IonItem>
                      );
                    })}
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </FadeIn>
      </IonContent>
    </IonPage>
  );
};

export default ListSayings;
