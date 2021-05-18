import {
  IonPage,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
  IonButtons,
  IonAvatar,
  IonFab,
  IonFabButton,
} from "@ionic/react";

import FadeIn from "react-fade-in";
import ListSets from "./ListSets";
import UserProfileButton from "../../_stories/UserProfileButton";

import { useEffect } from "react";
import { RootState } from "../../_reducers/rootReducer";
import { setActions } from "../../_actions/setActions";
import { add, notifications } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";

const Sets: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActions.getSets());
  }, []);

  const sets = useSelector((state: RootState) => state.set.sets);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButton size="large" slot="start">
              <IonIcon icon={notifications} />
            </IonButton>

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <UserProfileButton slot="end" />
          </IonToolbar>
        </IonHeader>

        <FadeIn>
          <ListSets sets={sets} />
        </FadeIn>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="primary" routerLink="/addset">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Sets;
