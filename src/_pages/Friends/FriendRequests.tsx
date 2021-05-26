import React, { ReactElement } from "react";
import { IonList, IonItem, IonLabel, IonButton, IonAvatar } from "@ionic/react";

interface Props {}

export default function FriendRequests({}: Props): ReactElement {
  return (
    <IonList>
      <br />
      <IonItem>
        <IonAvatar slot="start">
          <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
        </IonAvatar>
        <IonLabel>
          <h2>Vicky Zhen</h2>
        </IonLabel>
        <IonButton size="default" fill="clear" color="primary">
          Open
        </IonButton>
      </IonItem>
      <br />
      <IonItem>
        <IonAvatar slot="start">
          <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
        </IonAvatar>
        <IonLabel>
          <h2>Vicky Zhen</h2>
        </IonLabel>
        <IonButton size="default" fill="clear" color="primary">
          Open
        </IonButton>
      </IonItem>
      <br />
    </IonList>
  );
}
