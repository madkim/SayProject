import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonSpinner,
} from "@ionic/react";

import { Friend } from "../../_helpers/types";
import { RootState } from "../../_reducers/rootReducer";
import { friendActions } from "../../_actions/friendActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FadeIn from "react-fade-in";

interface Props {}

const FriendList: React.FC<Props> = ({}: Props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.friends.loading);
  const friends = useSelector((state: RootState) => state.friends.friends);
  const [routeClicked, setRouteClicked] = useState(false);

  useEffect(() => {
    dispatch(friendActions.getFriends());
  }, []);

  return (
    <>
      <br />
      {loading && !routeClicked ? (
        <div className="ion-text-center">
          <IonSpinner name="bubbles" />
        </div>
      ) : (
        <FadeIn>
          <IonList>
            {friends.length > 0 &&
              friends.map((friend: Friend) => {
                return (
                  <IonItem
                    key={friend.id}
                    button
                    detail
                    routerLink={`/friend-profile/${friend.id}`}
                    onClick={() => setRouteClicked(true)}
                  >
                    <IonAvatar slot="start">
                      <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
                    </IonAvatar>
                    <IonLabel>
                      <h2>{friend.name}</h2>
                    </IonLabel>
                  </IonItem>
                );
              })}
          </IonList>
        </FadeIn>
      )}
    </>
  );
};

export default FriendList;
