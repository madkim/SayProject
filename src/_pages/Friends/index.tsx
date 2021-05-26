import {
  IonPage,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
} from "@ionic/react";
import { notifications, personAdd } from "ionicons/icons";

import FriendList from "./FriendList";
import UserProfileButton from "../../_stories/UserProfileButton";

const Friends: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            {/* <IonButton size="large" slot="start" routerLink="/find-friends">
              <IonIcon icon={personAdd} />
            </IonButton> */}
            <IonButton size="large" slot="start">
              <IonIcon icon={notifications} />
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
