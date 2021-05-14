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

import { menuSharp } from "ionicons/icons";
import { menuController } from "@ionic/core";

const StudySayings: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            {/* <IonButtons slot="start" className="ion-padding">
              <IonButton fill="clear" onClick={() => menuController.open()}>
                <IonIcon
                  size="large"
                  icon={menuSharp}
                  style={{ color: "white" }}
                />
              </IonButton>
            </IonButtons> */}

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <UserProfileButton slot="start" />
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default StudySayings;
