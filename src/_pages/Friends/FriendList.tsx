import { RootState } from "../../_reducers/rootReducer";
import { useEffect } from "react";
import { friendActions } from "../../_actions/friendActions";
import { useDispatch, useSelector } from "react-redux";
import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonLoading,
} from "@ionic/react";

import FadeIn from "react-fade-in";
import { Friend } from "../../_helpers/types";

interface Props {}

const FriendList: React.FC<Props> = ({}: Props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.friends.loading);
  const friends = useSelector((state: RootState) => state.friends.friends);

  useEffect(() => {
    dispatch(friendActions.getFriends());
  }, []);

  return (
    <FadeIn>
      <IonList>
        <br />

        {loading ? (
          <IonLoading
            isOpen={loading}
            message={"Please wait..."}
            duration={5000}
          />
        ) : (
          friends.length > 0 &&
          friends.map((friend: Friend) => {
            return (
              <IonItem
                key={friend.email}
                button
                detail
                routerLink="/FriendProfile"
              >
                <IonAvatar slot="start">
                  <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
                </IonAvatar>
                <IonLabel>
                  <h2>{friend.name}</h2>
                </IonLabel>
              </IonItem>
            );
          })
        )}
      </IonList>
    </FadeIn>
  );
};

export default FriendList;
