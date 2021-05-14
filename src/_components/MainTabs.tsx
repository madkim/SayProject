import {
  IonApp,
  IonTabs,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonSplitPane,
} from "@ionic/react";

import { ReactElement } from "react";
import { Redirect, Route } from "react-router-dom";
import { book, helpCircle, peopleSharp, reader } from "ionicons/icons";

import Menu from "./Menu";
import Home from "../_pages/Home/Home";
import Stream from "../_pages/Stream/Stream";
import Friends from "../_pages/Friends";
import ViewSaying from "../_pages/ViewSayings/ViewSaying";
import ListSayings from "../_pages/ListSayings/ListSayings";
import StudySayings from "../_pages/StudySayings/StudySayings";

export default function MainTabs(): ReactElement {
  return (
    <IonSplitPane contentId="main">
      <Menu />
      <IonTabs>
        <IonRouterOutlet id="main">
          {/* <Route path="/home">
            <Home />
          </Route> */}
          <Route path="/view">
            <ViewSaying />
          </Route>
          <Route path="/list">
            <ListSayings />
          </Route>
          <Route path="/study">
            <StudySayings />
          </Route>
          <Route path="/friends">
            <Friends />
          </Route>
          <Route path="/stream">
            <Stream />
          </Route>
          {/* <Route exact path="/">
            <Redirect to="/home" />
          </Route> */}
          <Route exact path="/">
            <Redirect to="/list" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
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
    </IonSplitPane>
  );
}
