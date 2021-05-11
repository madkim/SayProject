import {
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/react";

import Sayings from "../_components/Sayings";
import SayingCards from "../_components/SayingCards";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="primary" style={{ padding: "1em" }}>
            <IonTitle size="large" className="ion-text-center">
              SAY
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <Sayings />
        <SayingCards />
      </IonContent>
    </IonPage>
  );
};

export default Home;
