import {
  IonPage,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
} from "@ionic/react";

import { notifications } from "ionicons/icons";

import UserProfileButton from "../../_stories/UserProfileButton";

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
