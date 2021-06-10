import { RootState } from "../../_reducers/rootReducer";
import { friendActions } from "../../_actions/friendActions";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonAvatar,
  IonSpinner,
} from "@ionic/react";
import FadeIn from "react-fade-in";
import { Request } from "../../_helpers/types";

interface Props {}

export default function FriendRequests({}: Props): ReactElement {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.friends.loading);
  const requests = useSelector((state: RootState) => state.friends.requests);

  const openRequest = () => {};

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
                        onClick={() => openRequest()}
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
