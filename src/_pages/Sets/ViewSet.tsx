import {
  IonPage,
  IonIcon,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonToolbar,
  IonLoading,
} from "@ionic/react";

import Ask from "../Sayings/AskSaying";
import FadeIn from "react-fade-in";
import SayingCards from "../Sayings/SayingCards";
import SearchSayings from "../Sayings/SearchSayings";

import { useParams } from "react-router";
import { RootState } from "../../_reducers/rootReducer";
import { setActions } from "../../_actions/setActions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chevronBack, close, searchOutline } from "ionicons/icons";

const ViewSet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [search, setSearch] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.set.loading);
  const currentSet = useSelector((state: RootState) => state.set.currentSet);

  useEffect(() => {
    dispatch(setActions.getSetById(id));
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start" className="ion-padding">
              <IonButton routerLink="/sets" routerDirection="back">
                <IonIcon icon={chevronBack} />
              </IonButton>
            </IonButtons>

            <h2>{currentSet.set.name}</h2>

            <IonButton slot="end" onClick={() => setSearch(!search)}>
              <IonIcon icon={search ? close : searchOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonLoading
          isOpen={loading}
          message={"Please wait..."}
          duration={5000}
        />

        {search ? (
          <SearchSayings sayings={currentSet.sayings} />
        ) : (
          <FadeIn>
            <Ask />
            <SayingCards sayings={currentSet.sayings} />
          </FadeIn>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewSet;
