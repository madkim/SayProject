import {
  IonCard,
  IonPage,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonToolbar,
} from "@ionic/react";

import FadeIn from "react-fade-in";
import Sayings from "../Home/Sayings";
import SayingCards from "../Home/SayingCards";
import { chevronBack } from "ionicons/icons";

const Stream: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start" className="ion-padding">
              <IonButton routerLink="/friends" routerDirection="back">
                <IonIcon icon={chevronBack} />
              </IonButton>
            </IonButtons>

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <SayingCards />
        <div>
          <IonCard
            className="ion-padding"
            style={{ position: "fixed", bottom: "1em" }}
          >
            <Sayings />
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Stream;
