import {
  IonApp,
  IonTabs,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { book, helpCircle, peopleSharp } from "ionicons/icons";

import Home from "./_pages/Home";
import ViewSaying from "./_pages/ViewSaying";
import ListSayings from "./_pages/ListSayings";
import StudySayings from "./_pages/StudySayings";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet id="main">
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/view">
            <ViewSaying />
          </Route>
          <Route exact path="/list">
            <ListSayings />
          </Route>
          <Route exact path="/study">
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
    </IonReactRouter>
  </IonApp>
);

export default App;
