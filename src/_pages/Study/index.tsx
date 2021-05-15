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
import UserProfileButton from "../../_stories/UserProfileButton";

import { menuSharp, notifications } from "ionicons/icons";
import { menuController } from "@ionic/core";

const Study: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <UserProfileButton slot="end" />

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <IonButton size="large" slot="start">
              <IonIcon icon={notifications} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Study;
