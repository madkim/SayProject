import {
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonAvatar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import {
  personAdd,
  peopleCircleOutline,
  personCircleOutline,
} from "ionicons/icons";
import { useState } from "react";
import FadeIn from "react-fade-in";
import FriendRequests from "./FriendRequests";
import FriendSearch from "./FriendSearch";

interface Props {}

const FriendList: React.FC<Props> = ({}: Props) => {
  const [type, setType] = useState("friends");

  return (
    <FadeIn>
      <div style={{ margin: "1em" }}>
        <IonSegment value={type} onIonChange={(e) => setType(e.detail.value!)}>
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

      {type === "friends" && (
        <IonList>
          <br />
          <IonItem button detail routerLink="/FriendProfile">
            <IonAvatar slot="start">
              <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
            </IonAvatar>
            <IonLabel>
              <h2>Vicky Zhen</h2>
            </IonLabel>
          </IonItem>
        </IonList>
      )}

      {type === "requests" && <FriendRequests />}

      {type === "search" && <FriendSearch />}

      <br />
    </FadeIn>
  );
};

export default FriendList;
