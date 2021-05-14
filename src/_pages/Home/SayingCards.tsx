import {
  IonCard,
  IonIcon,
  IonNote,
  IonText,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";

import React, { ReactElement } from "react";
import { checkmark, closeOutline } from "ionicons/icons";

interface Props {}

export default function SayingCards({}: Props): ReactElement {
  return (
    <>
      <IonCard button routerLink="/view">
        <IonCardHeader
          color="light"
          style={{ fontSize: "large", fontWeight: "700" }}
        >
          <IonNote color="danger">
            <IonIcon icon={closeOutline} /> &nbsp; Pending
          </IonNote>
        </IonCardHeader>
        <IonCardContent>
          <br />
          <IonText color="dark">I need to use the restroom.</IonText>
        </IonCardContent>
      </IonCard>
      <IonCard button routerLink="/view">
        <IonCardHeader
          color="light"
          style={{ fontSize: "large", fontWeight: "700" }}
        >
          <IonNote color="success">
            <IonIcon icon={checkmark} /> &nbsp; Answered
          </IonNote>
        </IonCardHeader>
        <IonCardContent>
          <br />
          <IonText color="dark">Hello, my name is Matthew Kim.</IonText>
        </IonCardContent>
      </IonCard>
    </>
  );
}
