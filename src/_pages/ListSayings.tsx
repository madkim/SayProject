import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonGrid,
  IonPage,
  IonLabel,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSearchbar,
  IonItemDivider,
} from "@ionic/react";
import FadeIn from "react-fade-in";
import { useState } from "react";

const ListSayings: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="primary" style={{ padding: "1em" }}>
            <IonTitle size="large" className="ion-text-center">
              SAY
            </IonTitle>
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
                <IonList className="ion-padding-horizontal">
                  <IonItemDivider>
                    <IonLabel>A</IonLabel>
                  </IonItemDivider>
                  <IonItem detail button routerLink="/view">
                    <IonLabel>Pokémon Yellow</IonLabel>
                  </IonItem>
                  <IonItem detail button routerLink="/view">
                    <IonLabel>Mega Man X</IonLabel>
                  </IonItem>
                  <IonItem detail button routerLink="/view">
                    <IonLabel>The Legend of Zelda</IonLabel>
                  </IonItem>
                  <IonItem detail button routerLink="/view">
                    <IonLabel>Pac-Man</IonLabel>
                  </IonItem>
                  <IonItem detail button routerLink="/view">
                    <IonLabel>Super Mario World</IonLabel>
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
