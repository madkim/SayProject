import {
  IonRow,
  IonCol,
  IonItem,
  IonPage,
  IonIcon,
  IonGrid,
  IonTitle,
  IonInput,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
  IonSpinner,
  IonListHeader,
} from "@ionic/react";

import { useState } from "react";
import { RootState } from "../../../_reducers/rootReducer";
import { setActions } from "../../../_actions/setActions";
import { useHistory } from "react-router";
import { chevronBack } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";

import FadeIn from "react-fade-in";
import ShowError from "../../../_stories/ShowError";
import AddFriendToSet from "./AddFriendToSet";

const AddSet: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state: RootState) => state.set.loading);

  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [friends, setFriends] = useState<string[]>([]);

  const validateSet = () => {
    if (name === "") {
      setErrors({ name: "Set name is required" });
    } else {
      addSet();
    }
  };

  const addSet = () => {
    dispatch(setActions.addSet(name, friends, history));
  };

  const selectShareFriends = (friend: string) => {
    setFriends([...friends, friend]);
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButton
              size="large"
              slot="start"
              routerLink="/sets"
              routerDirection="back"
            >
              <IonIcon icon={chevronBack} />
            </IonButton>

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <FadeIn>
          <IonGrid>
            <IonRow>
              <IonCol className="ion-padding-end">
                <IonListHeader>Set Name:</IonListHeader>
                <IonItem>
                  <IonInput
                    type="text"
                    value={name}
                    onIonChange={(e) => setName(e.detail.value!)}
                  ></IonInput>
                </IonItem>
                <ShowError show={"name"} errors={errors} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-padding-end">
                <AddFriendToSet selectFriend={selectShareFriends} />
              </IonCol>
            </IonRow>
            <IonRow style={{ paddingTop: window.screen.height / 2.2 }}>
              <IonCol className="ion-padding-horizontal">
                <IonButton
                  expand="block"
                  disabled={loading}
                  onClick={validateSet}
                >
                  {loading ? <IonSpinner name="bubbles" /> : " Add Set"}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </FadeIn>
      </IonContent>
    </IonPage>
  );
};

export default AddSet;
