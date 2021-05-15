import {
  IonPage,
  IonIcon,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonToolbar,
} from "@ionic/react";

import Ask from "./AskSaying";
import SayingCards from "./SayingCards";
import SearchSayings from "./SearchSayings";
import { chevronBack, close, searchOutline } from "ionicons/icons";
import { useState } from "react";

const Stream: React.FC = () => {
  const [search, setSearch] = useState(false);

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

            <h2>Chinese Words and Phrases</h2>

            <IonButton slot="end" onClick={() => setSearch(!search)}>
              <IonIcon icon={search ? close : searchOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        {search ? (
          <SearchSayings />
        ) : (
          <>
            <Ask />
            <SayingCards />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Stream;
