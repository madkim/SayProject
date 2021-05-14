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
} from "@ionic/react";

import { useState } from "react";
import { menuSharp, notifications } from "ionicons/icons";
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
            {/* <IonButtons slot="start" className="ion-padding">
              <IonButton fill="clear" onClick={() => menuController.open()}>
                <IonIcon
                  size="large"
                  icon={menuSharp}
                  style={{ color: "white" }}
                />
              </IonButton>
            </IonButtons> */}

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
                  {/* <IonList className="ion-padding-horizontal"> */}
                  {/* <IonItemDivider>
                    <IonLabel>A</IonLabel>
                  </IonItemDivider> */}
                  <IonItem detail button routerLink="/view">
                    <IonLabel className="ion-padding-vertical">
                      <IonRow>
                        <IonCol>
                          <small>Thurs 12th</small>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>Pokémon Yellow</IonCol>
                      </IonRow>
                    </IonLabel>
                  </IonItem>
                  <IonItem detail button routerLink="/view">
                    <IonLabel className="ion-padding-vertical">
                      <IonRow>
                        <IonCol>
                          <small>Sun 8th</small>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>Mega Man X</IonCol>
                      </IonRow>
                    </IonLabel>
                  </IonItem>
                  <IonItem detail button routerLink="/view">
                    <IonLabel className="ion-padding-vertical">
                      <IonRow>
                        <IonCol>
                          <small>Sun 8th</small>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>The Legend of Zelda</IonCol>
                      </IonRow>
                    </IonLabel>
                  </IonItem>
                  <IonItem detail button routerLink="/view">
                    <IonLabel className="ion-padding-vertical">
                      <IonRow>
                        <IonCol>
                          <small>Sun 8th</small>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>Super Mario World</IonCol>
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
