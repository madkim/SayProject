import React, { ReactElement } from "react";
import { checkmark, closeOutline } from "ionicons/icons";
import { IonCard, IonIcon, IonCardHeader, IonCardContent } from "@ionic/react";

interface Props {}

export default function SayingCards({}: Props): ReactElement {
  return (
    <>
      <IonCard button routerLink="/view">
        <IonCardHeader color="danger" style={{ fontSize: "large" }}>
          <IonIcon icon={closeOutline} /> &nbsp; Needs Review
        </IonCardHeader>
        <IonCardContent>
          <br />I need to use the restroom.
        </IonCardContent>
      </IonCard>
      <IonCard button routerLink="/view">
        <IonCardHeader color="success" style={{ fontSize: "large" }}>
          <IonIcon icon={checkmark} /> &nbsp; Answered
        </IonCardHeader>
        <IonCardContent>
          <br />
          Hello, my name is Matthew Kim.
        </IonCardContent>
      </IonCard>
    </>
  );
}
