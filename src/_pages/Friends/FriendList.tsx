import FadeIn from "react-fade-in";
import { IonList, IonItem, IonLabel, IonAvatar } from "@ionic/react";

interface Props {}

const FriendList: React.FC<Props> = ({}: Props) => {
  return (
    <FadeIn>
      <IonList>
        <br />
        <IonItem button detail routerLink="/FriendProfile">
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
