import {
  IonFab,
  IonPage,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
  IonFabButton,
} from "@ionic/react";

import ListSets from "./ListSets";
import UserProfileButton from "../../_stories/UserProfileButton";

import { useEffect } from "react";
import { RootState } from "../../_reducers/rootReducer";
import { setActions } from "../../_actions/setActions";
import { add, notifications } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";

const Sets: React.FC = () => {
  const dispatch = useDispatch();
  const sets = useSelector((state: RootState) => state.set.sets);
  const loading = useSelector((state: RootState) => state.set.loading);

  useEffect(() => {
    dispatch(setActions.getAllSets());
  }, []);

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

        <ListSets sets={sets} loading={loading} />

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
