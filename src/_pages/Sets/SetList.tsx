import {
  IonCard,
  IonIcon,
  IonNote,
  IonText,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonChip,
  IonAvatar,
  IonLabel,
  IonRow,
  IonCol,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";

import React, { ReactElement } from "react";

interface Props {}

export default function SetList({}: Props): ReactElement {
  return (
    <>
      <IonCard button routerLink="/sayings">
        <IonCardHeader color="dark">
          <IonCardTitle>Chinese Words and Phrases</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonNote color="dark">
            <br />
            <h2>Cards: 10</h2>
            <br />
            <h2>Owner: Carmen Chen</h2>
            <br />
            <h2>Shared: Vicky Zhen</h2>
          </IonNote>
        </IonCardContent>
      </IonCard>
      <IonCard button routerLink="/sayings">
        <IonCardHeader color="dark">
          <IonCardTitle>Korean Words and Phrases</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonNote color="dark">
            <br />
            <h2>Cards: 10</h2>
            <br />
            <h2>Owner: Carmen Chen</h2>
            <br />
            <h2>Shared: Vicky Zhen</h2>
          </IonNote>
        </IonCardContent>
      </IonCard>
    </>
  );
}
