import {
  IonRow,
  IonCol,
  IonCard,
  IonPage,
  IonIcon,
  IonGrid,
  IonItem,
  IonList,
  IonLabel,
  IonTitle,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";

import React, { ReactElement } from "react";
import { add, chevronBack, micSharp, play } from "ionicons/icons";

interface Props {}

export default function ViewSaying({}: Props): ReactElement {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="primary" style={{ padding: "1em" }}>
            <IonButtons slot="start">
              <IonButton routerLink="/home" routerDirection="back">
                <IonIcon icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonTitle size="large" className="ion-text-center">
              SAY
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader color="success" style={{ fontSize: "large" }}>
            How do you say:
          </IonCardHeader>
          <IonCardContent>
            <br />
            <h1>Hello, my name is Matthew.</h1>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader color="success" style={{ fontSize: "large" }}>
            Recordings:
          </IonCardHeader>
          <IonCardContent>
            <br />
            <IonList>
              <IonRow>
                <IonCol>
                  <IonItem lines="full" style={{ padding: ".5em" }}>
                    <IonLabel>Pokémon Yellow</IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="auto">
                  <IonButton color="dark" fill="outline">
                    <IonIcon icon={play} />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem lines="full" style={{ padding: ".5em" }}>
                    <IonLabel>Mega Man X</IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="auto">
                  <IonButton color="dark" fill="outline">
                    <IonIcon icon={play} />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <br />
                  <IonButton expand="block" color="success" fill="solid">
                    <IonIcon icon={micSharp} /> &nbsp;Add Recording
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonGrid>
          <IonRow style={{ paddingTop: "4em" }}>
            <IonCol>
              <IonButton
                color="primary"
                expand="block"
                routerLink="/home"
                routerDirection="back"
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
