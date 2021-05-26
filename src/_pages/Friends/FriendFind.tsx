import {
  IonPage,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonTitle,
  IonButton,
  IonHeader,
  IonAvatar,
  IonToolbar,
  IonContent,
  IonButtons,
  IonListHeader,
} from "@ionic/react";

import { NavContext } from "@ionic/react";
import { ReactElement, useContext } from "react";
import { chevronBack, add, remove, close, searchOutline } from "ionicons/icons";
import FriendRequests from "./FriendRequests";
import FriendSearch from "./FriendSearch";

interface Props {}

export default function FriendFind({}: Props): ReactElement {
  const { goBack } = useContext(NavContext);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start" className="ion-padding">
              <IonButton onClick={() => goBack("/friends")}>
                <IonIcon icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>
              <h1>Find Friends</h1>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <FriendSearch />
      </IonContent>
    </IonPage>
  );
}
