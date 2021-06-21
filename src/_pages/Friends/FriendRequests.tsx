import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonAvatar,
  IonSpinner,
  useIonAlert,
} from "@ionic/react";

import { Request } from "../../_helpers/types";
import { RootState } from "../../_reducers/rootReducer";
import { friendActions } from "../../_actions/friendActions";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FadeIn from "react-fade-in";

interface Props {}

export default function FriendRequests({}: Props): ReactElement {
  const dispatch = useDispatch();
  const [present] = useIonAlert();
  const loading = useSelector((state: RootState) => state.friends.loading);
  const requests = useSelector((state: RootState) => state.friends.requests);

  const openRequest = (name: string) => {
    present({
      header: "Friend Request",
      message: `Respond to ${name}'s friend request.`,
      buttons: [
        { text: "Accept", handler: (d) => console.log("Accept pressed") },
        { text: "Decline", handler: (d) => console.log("Decline pressed") },
      ],
    });
  };

  useEffect(() => {
    dispatch(friendActions.getFriendRequests());
  }, []);

  return (
    <>
      <br />
      {loading ? (
        <div className="ion-text-center">
          <IonSpinner name="bubbles" />
        </div>
      ) : (
        <FadeIn>
          <IonList>
            {requests.length > 0 &&
              requests.map((request: Request) => {
                return (
                  <div key={request.id}>
                    <IonItem>
                      <IonAvatar slot="start">
                        <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
                      </IonAvatar>
                      <IonLabel>
                        <h2>{request.name}</h2>
                      </IonLabel>
                      <IonButton
                        size="default"
                        fill="clear"
                        color="primary"
                        onClick={() => openRequest(request.name)}
                      >
                        Open
                      </IonButton>
                    </IonItem>
                    <br />
                  </div>
                );
              })}
          </IonList>
        </FadeIn>
      )}
    </>
  );
}
