import {
  IonPage,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
  IonButtons,
  IonAvatar,
  IonFab,
  IonFabButton,
} from "@ionic/react";

import { add, menuSharp, notifications } from "ionicons/icons";
import { menuController } from "@ionic/core";

import FadeIn from "react-fade-in";
import SetList from "./SetList";
import UserProfileButton from "../../_stories/UserProfileButton";

const Sets: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButton size="large" slot="start">
              <IonIcon icon={notifications} />
            </IonButton>

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <UserProfileButton slot="end" />
          </IonToolbar>
        </IonHeader>

        <FadeIn>
          <SetList />
        </FadeIn>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="dark">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Sets;
