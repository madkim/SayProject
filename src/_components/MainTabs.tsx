import {
  IonTabs,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
} from "@ionic/react";

import { registerPush } from "../_services/pushService";
import { Redirect, Route } from "react-router-dom";
import { ReactElement, useEffect } from "react";
import { albums, book, peopleSharp, reader } from "ionicons/icons";

import Set from "../_pages/Sets/ViewSet";
import Sets from "../_pages/Sets";
import AddSet from "../_pages/Sets/AddSet/AddSet";
import Friends from "../_pages/Friends";
import ViewSaying from "../_pages/Sayings/ViewSaying";
import ListSayings from "../_pages/Sayings/ListSayings";
import StudySayings from "../_pages/Study";
import FriendProfile from "../_pages/Friends/FriendProfile";

export default function MainTabs(): ReactElement {
  useEffect(() => {
    const permission = localStorage.getItem("pushNotificationsGranted");

    if (permission === null) {
      registerPush();
    }
  }, []);

  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route path="/sets">
          <Sets />
        </Route>
        <Route path="/set/:id">
          <Set />
        </Route>
        <Route path="/addset">
          <AddSet />
        </Route>
        <Route path="/view/:id">
          <ViewSaying />
        </Route>
        <Route path="/list">
          <ListSayings />
        </Route>
        <Route path="/study">
          <StudySayings />
        </Route>
        <Route path="/friend-profile/:id">
          <FriendProfile />
        </Route>
        <Route path="/friends">
          <Friends />
        </Route>
        <Route exact path="/">
          <Redirect to="/sets" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="sets" href="/sets">
          <IonIcon icon={albums} />
          <IonLabel>Sets</IonLabel>
        </IonTabButton>

        <IonTabButton tab="list" href="/list">
          <IonIcon icon={reader} />
          <IonLabel>Sayings</IonLabel>
        </IonTabButton>

        <IonTabButton tab="study" href="/study">
          <IonIcon icon={book} />
          <IonLabel>Study</IonLabel>
        </IonTabButton>

        <IonTabButton tab="freinds" href="/friends">
          <IonIcon icon={peopleSharp} />
          <IonLabel>Friends</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
