import {
  IonPage,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
  IonButtons,
} from "@ionic/react";

import { useState } from "react";
import { chevronBack, menuSharp, personAdd } from "ionicons/icons";
import { menuController } from "@ionic/core";

import UserProfileButton from "../../_stories/UserProfileButton";
import FriendList from "./FriendList";

const Friends: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <UserProfileButton slot="start" />

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <IonButton size="large" slot="end">
              <IonIcon icon={personAdd} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <FriendList />
      </IonContent>
    </IonPage>
  );
};

export default Friends;
