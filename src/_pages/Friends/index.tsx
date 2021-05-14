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
            <IonButton size="large">
              <IonIcon icon={personAdd} />
            </IonButton>

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <UserProfileButton slot="end" />
          </IonToolbar>
        </IonHeader>

        <FriendList />
      </IonContent>
    </IonPage>
  );
};

export default Friends;
