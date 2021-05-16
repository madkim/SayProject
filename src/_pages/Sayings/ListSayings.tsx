import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonGrid,
  IonPage,
  IonIcon,
  IonLabel,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
  IonButtons,
  IonSearchbar,
  IonItemDivider,
  IonNote,
  IonText,
} from "@ionic/react";

import { useState } from "react";
import {
  checkbox,
  checkmark,
  closeOutline,
  menuSharp,
  notifications,
} from "ionicons/icons";
import { menuController } from "@ionic/core";

import FadeIn from "react-fade-in";
import UserProfileButton from "../../_stories/UserProfileButton";

const ListSayings: React.FC = () => {
  const [searchText, setSearchText] = useState("");

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
                  <IonItem detail button routerLink="/view">
                    <IonLabel className="ion-padding-vertical">
                      <IonRow>
                        <IonCol size="auto">
                          <small>April 12th 2021</small>
                        </IonCol>

                        <IonCol>
                          <small>
                            <IonNote color="danger">&nbsp;No Recording</IonNote>
                          </small>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol>
                          <div className="ion-text-wrap">
                            <h1>
                              Hello, my name is Matthew. I am a traveler from
                              America looking for the bathroom.
                            </h1>
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
                  <IonItem detail button routerLink="/view">
                    <IonLabel className="ion-padding-vertical">
                      <IonRow>
                        <IonCol>
                          <small>April 8th 2021</small>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol>
                          <div className="ion-text-wrap">
                            <h1>
                              This is another phrase I want to know how to say.
                            </h1>
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
