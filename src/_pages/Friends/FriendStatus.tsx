import { IonButton } from "@ionic/react";
import { Friend, Request } from "../../_helpers/types";
import { useState, useEffect } from "react";

interface Props {
  id: string;
  friends: Friend[];
  requests: Request[];
}

const FriendStatus: React.FC<Props> = ({ id, friends, requests }: Props) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    friendStatus();
  }, []);

  const friendStatus = () => {
    if (friends.find((friend: Friend) => friend.id === id)) {
      setStatus("friends");
    } else if (requests.find((request: Request) => request.id === id)) {
      setStatus("requested");
    } else if (false) {
      setStatus("sent-request");
    } else {
      setStatus("not-friends");
    }
  };

  return (
    <div>
      {status === "friends" && (
        <IonButton
          size="large"
          fill="clear"
          color="danger"
          className="ion-margin-top"
        >
          Delete Friend
        </IonButton>
      )}

      {status === "requested" && (
        <IonButton
          size="large"
          fill="clear"
          color="medium"
          className="ion-margin-top"
          disabled
        >
          Awaiting Response
        </IonButton>
      )}

      {status === "sent-request" && (
        <IonButton
          size="large"
          fill="clear"
          color="medium"
          disabled
          className="ion-margin-top"
        >
          Friend Request Sent
        </IonButton>
      )}

      {status === "not-friends" && (
        <IonButton size="large" fill="clear" className="ion-margin-top">
          Send Friend Request
        </IonButton>
      )}
    </div>
  );
};

export default FriendStatus;
