import {
  personAdd,
  peopleCircleOutline,
  personCircleOutline,
} from "ionicons/icons";

import { ReactElement } from "react";
import { IonIcon, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

interface Props {
  type: string;
  setType: (type: string) => void;
}

export default function FriendSegment({ type, setType }: Props): ReactElement {
  return (
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
  );
}
