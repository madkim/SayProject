import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonCheckbox,
  IonListHeader,
} from "@ionic/react";

import FadeIn from "react-fade-in";
import { Friend } from "../../../_helpers/types";
import { RootState } from "../../../_reducers/rootReducer";
import { friendActions } from "../../../_actions/friendActions";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  selectFriend: (friend: string) => void;
}

export default function AddFriendToSet({}: Props): ReactElement {
  const dispatch = useDispatch();
  const friends = useSelector((state: RootState) => state.friends.friends);

  useEffect(() => {
    dispatch(friendActions.getFriends());
  }, []);

  return (
    <FadeIn>
      <IonList>
        <IonListHeader>Add Friends To Set:</IonListHeader>
        <br />

        {friends.length > 0 &&
          friends.map((friend: Friend) => {
            return (
              <IonItem key={friend.email}>
                <IonAvatar slot="start">
                  <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
                </IonAvatar>
                <IonLabel>
                  <h2>{friend.name}</h2>
                </IonLabel>
                <IonCheckbox slot="end" color="primary" />
              </IonItem>
            );
          })}
      </IonList>
    </FadeIn>
  );
}
