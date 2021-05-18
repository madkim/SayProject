import {
  IonLabel,
  IonList,
  IonListHeader,
  IonItem,
  IonAvatar,
  IonCheckbox,
} from "@ionic/react";

import FadeIn from "react-fade-in";
import React, { ReactElement } from "react";

interface Props {
  selectFriend: (friend: string) => void;
}

export default function AddFriendToSet({}: Props): ReactElement {
  return (
    <FadeIn>
      <IonList>
        <IonListHeader>Add Friends To Set:</IonListHeader>
        <br />

        <IonItem>
          <IonAvatar slot="start">
            <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
          </IonAvatar>
          <IonLabel>
            <h2>Vicky Zhen</h2>
          </IonLabel>
          <IonCheckbox slot="end" color="primary" />
        </IonItem>
      </IonList>
    </FadeIn>
  );
}
