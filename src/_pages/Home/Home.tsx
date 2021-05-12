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
} from "@ionic/react";

import { menuSharp } from "ionicons/icons";
import { menuController } from "@ionic/core";

import FadeIn from "react-fade-in";
import Sayings from "./Sayings";
import SayingCards from "./SayingCards";
import UserProfileButton from "../../_stories/UserProfileButton";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start" className="ion-padding">
              <IonButton fill="clear">
                {/* <IonButton fill="clear" onClick={() => menuController.open()}> */}
                {/* <IonIcon
                  size="large"
                  icon={menuSharp}
                  style={{ color: "white" }}
                /> */}
              </IonButton>
            </IonButtons>

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <UserProfileButton slot="end" />
          </IonToolbar>
        </IonHeader>

        <FadeIn>
          <Sayings />
          <SayingCards />
        </FadeIn>
      </IonContent>
    </IonPage>
  );
};

export default Home;
