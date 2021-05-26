import {
  IonPage,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
} from "@ionic/react";

import FadeIn from "react-fade-in";
import FriendList from "./FriendList";
import FriendSearch from "./FriendSearch";
import FriendSegment from "./FriendSegment";
import FriendRequests from "./FriendRequests";
import UserProfileButton from "../../_stories/UserProfileButton";

import { useState } from "react";
import { notifications } from "ionicons/icons";

const Friends: React.FC = () => {
  const [type, setType] = useState("friends");

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
          <FriendSegment type={type} setType={setType} />

          {type === "friends" && <FriendList />}

          {type === "requests" && <FriendRequests />}

          {type === "search" && <FriendSearch />}

          <br />
        </FadeIn>
      </IonContent>
    </IonPage>
  );
};

export default Friends;
