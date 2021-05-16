import {
  IonRow,
  IonCol,
  IonText,
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

import {
  caretForwardCircle,
  micSharp,
  chevronBack,
  ellipsisHorizontal,
  stopCircleSharp,
} from "ionicons/icons";
import EditButton from "../../_stories/EditButton";

interface Props {}

export default function ViewSaying({}: Props): ReactElement {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start" className="ion-padding">
              <IonButton routerLink="/sayings" routerDirection="back">
                <IonIcon icon={chevronBack} />
              </IonButton>
            </IonButtons>

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <EditButton slot="end" />
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader color="light" style={{ fontSize: "large" }}>
            How do you say:
          </IonCardHeader>
          <IonCardContent>
            <br />
            <IonText color="dark">
              <h1>Hello, my name is Matthew.</h1>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader color="light" style={{ fontSize: "large" }}>
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
                  <IonButton color="success" fill="outline">
                    <IonIcon icon={caretForwardCircle} />
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
                  <IonButton color="success" fill="outline">
                    <IonIcon icon={caretForwardCircle} />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <br />
                  <IonButton color="danger" expand="block" fill="outline">
                    <IonIcon icon={stopCircleSharp} /> &nbsp;Add Recording
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
                fill="outline"
                color="primary"
                expand="block"
                className="ion-padding-horizontal"
                routerLink="/sayings"
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
