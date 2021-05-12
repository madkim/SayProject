import {
  IonApp,
  IonTabs,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
} from "@ionic/react";

import { ReactElement } from "react";
import { Redirect, Route } from "react-router-dom";
import { book, helpCircle, peopleSharp } from "ionicons/icons";

import Home from "./Home";
import Login from "./Login/Login";
import ViewSaying from "./ViewSaying";
import ListSayings from "./ListSayings";
import StudySayings from "./StudySayings";

export default function MainTabs(): ReactElement {
  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/view/:viewed">
          <ViewSaying />
        </Route>
        <Route path="/list">
          <ListSayings />
        </Route>
        <Route path="/study">
          <StudySayings />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={helpCircle} />
          <IonLabel>Ask</IonLabel>
        </IonTabButton>

        <IonTabButton tab="sayings" href="/list">
          <IonIcon icon={peopleSharp} />
          <IonLabel>Sayings</IonLabel>
        </IonTabButton>

        <IonTabButton tab="study" href="/study">
          <IonIcon icon={book} />
          <IonLabel>Study</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
