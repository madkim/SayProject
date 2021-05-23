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
import { sayingActions } from "../../_actions/sayingActions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chevronBack, close, searchOutline } from "ionicons/icons";
import { sayingConstants } from "../../_constants/sayingConstants";

const ViewSet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [search, setSearch] = useState(false);

  const dispatch = useDispatch();
  const set = useSelector((state: RootState) => state.set.currentSet);
  const loading = useSelector((state: RootState) => state.set.loading);
  const sayings = useSelector((state: RootState) => state.saying.sayings);

  useEffect(() => {
    dispatch(setActions.getSetById(id));
    dispatch(sayingActions.getSayingsBySetId(id));
  }, []);

  const addNewSaying = (saying: string) => {
    dispatch(sayingActions.addNewSaying(saying, set.id));
  };

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

            <h2>{set.name}</h2>

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
          <SearchSayings sayings={sayings} />
        ) : (
          <FadeIn>
            <Ask addNewSaying={addNewSaying} />
            <SayingCards sayings={sayings} setId={id} />
          </FadeIn>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewSet;
