import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonAvatar,
  IonListHeader,
} from "@ionic/react";

import React, { ReactElement } from "react";

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
          Accept
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
          Accept
        </IonButton>
      </IonItem>
      <br />
    </IonList>
  );
}
