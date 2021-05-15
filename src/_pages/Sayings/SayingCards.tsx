import {
  IonCard,
  IonIcon,
  IonNote,
  IonText,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonList,
  IonItem,
  IonLabel,
  IonCol,
} from "@ionic/react";

import FadeIn from "react-fade-in";

import React, { ReactElement } from "react";
import {
  checkmark,
  checkmarkCircleSharp,
  closeCircleOutline,
  closeCircleSharp,
  closeOutline,
} from "ionicons/icons";

interface Props {}

export default function SayingCards({}: Props): ReactElement {
  return (
    <>
      <IonCard button routerLink="/view">
        <IonCardHeader
          color="dark"
          style={{ fontSize: "large", fontWeight: "700" }}
        >
          <IonNote color="danger">
            <IonIcon icon={closeCircleSharp} />
          </IonNote>
          &nbsp; Pending
        </IonCardHeader>
        <IonCardContent>
          <br />
          <IonText color="dark">I need to use the restroom.</IonText>
        </IonCardContent>
      </IonCard>
      <IonCard button routerLink="/view">
        <IonCardHeader
          color="dark"
          style={{ fontSize: "large", fontWeight: "700" }}
        >
          <IonNote color="success">
            <IonIcon icon={checkmarkCircleSharp} />
          </IonNote>
          &nbsp; Answered
        </IonCardHeader>
        <IonCardContent>
          <br />
          <IonText color="dark">Hello, my name is Matthew Kim.</IonText>
        </IonCardContent>
      </IonCard>
    </>
  );
}
