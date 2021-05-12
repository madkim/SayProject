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
import { useParams } from "react-router-dom";
import { chevronBack, micSharp, play } from "ionicons/icons";

interface Props {}

export default function ViewSaying({}: Props): ReactElement {
  const { viewed } = useParams<{ viewed: string }>();

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary" className="ion-padding-top">
            <IonButtons slot="start">
              <IonButton
                slot="start"
                fill="clear"
                routerLink="/"
                routerDirection="back"
              >
                <IonIcon icon={chevronBack} style={{ color: "white" }} />
              </IonButton>
            </IonButtons>
            <IonTitle size="large" className="ion-text-center">
              SAY
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader
            color={`${viewed === "true" ? "success" : "danger"}`}
            style={{ fontSize: "large" }}
          >
            How do you say:
          </IonCardHeader>
          <IonCardContent>
            <br />
            <h1>Hello, my name is Matthew.</h1>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader
            color={`${viewed === "true" ? "success" : "danger"}`}
            style={{ fontSize: "large" }}
          >
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
                  <IonButton
                    expand="block"
                    color={`${viewed === "true" ? "success" : "danger"}`}
                    fill="solid"
                  >
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
