import {
  IonText,
  IonPage,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonAvatar,
  IonToolbar,
  IonContent,
  IonButtons,
  IonSpinner,
} from "@ionic/react";

import FadeIn from "react-fade-in";
import FriendStatus from "./FriendStatus";

import { useParams } from "react-router";
import { RootState } from "../../_reducers/rootReducer";
import { NavContext } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { friendActions } from "../../_actions/friendActions";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, useContext, useEffect } from "react";

interface Props {}

export default function FriendProfile({}: Props): ReactElement {
  const dispatch = useDispatch();
  const { goBack } = useContext(NavContext);
  const loading = useSelector((state: RootState) => state.friends.loading);
  const friends = useSelector((state: RootState) => state.friends.friends);
  const requests = useSelector((state: RootState) => state.friends.requests);

  useEffect(() => {
    dispatch(friendActions.getFriends());
    dispatch(friendActions.getFriendRequests());
  }, []);

  const { id } = useParams<{ id: string }>();

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

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading ? (
          <div className="ion-text-center" style={{ marginTop: "4em" }}>
            <IonSpinner name="bubbles" />
          </div>
        ) : (
          <FadeIn>
            <div className="ion-text-center">
              <IonAvatar
                style={{
                  width: "8em",
                  height: "8em",
                  margin: "auto",
                  marginTop: "2em",
                  marginBottom: "2em",
                }}
              >
                <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
              </IonAvatar>
              <h2>
                <IonText>Test Test</IonText>
              </h2>

              <FriendStatus id={id} requests={requests} friends={friends} />
            </div>
          </FadeIn>
        )}
      </IonContent>
    </IonPage>
  );
}
