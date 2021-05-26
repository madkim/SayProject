import {
  IonPage,
  IonIcon,
  IonTitle,
  IonLabel,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";

import {
  personAdd,
  notifications,
  peopleCircleOutline,
  personCircleOutline,
} from "ionicons/icons";

import FadeIn from "react-fade-in";
import FriendList from "./FriendList";
import FriendSearch from "./FriendSearch";
import FriendRequests from "./FriendRequests";
import UserProfileButton from "../../_stories/UserProfileButton";

import { useState } from "react";

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
          <div style={{ margin: "1em" }}>
            <IonSegment
              value={type}
              onIonChange={(e) => setType(e.detail.value!)}
            >
              <IonSegmentButton value="friends" style={{ padding: ".5em" }}>
                <IonIcon icon={peopleCircleOutline} />
                <IonLabel>Friends</IonLabel>
              </IonSegmentButton>

              <IonSegmentButton value="requests" style={{ padding: ".5em" }}>
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Requests</IonLabel>
              </IonSegmentButton>

              <IonSegmentButton value="search" style={{ padding: ".5em" }}>
                <IonIcon icon={personAdd} />
                <IonLabel>Search</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

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
