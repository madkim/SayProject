import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonListHeader,
} from "@ionic/react";
import FadeIn from "react-fade-in";

interface Props {}

const FriendList: React.FC<Props> = ({}: Props) => {
  return (
    <FadeIn>
      <IonList>
        <IonListHeader>Friends</IonListHeader>
        <br />

        <IonItem button detail routerLink="/stream">
          <IonAvatar slot="start">
            <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
          </IonAvatar>
          <IonLabel>
            <h2>Vicky Zhen</h2>
          </IonLabel>
        </IonItem>
      </IonList>
    </FadeIn>
  );
};

export default FriendList;
