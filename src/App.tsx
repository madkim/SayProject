import { Route } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { RootState } from "./_reducers/rootReducer";
import { useSelector } from "react-redux";
import { IonReactRouter } from "@ionic/react-router";

import Login from "./_pages/Login/Login";
import MainTabs from "./_pages/MainTabs";

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

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <IonApp>
      <IonReactRouter>
        <Route path="/login" component={Login} exact />
        <Route path="/forgot-password" component={Login} exact />
        <Route path="/forgot-username" component={Login} exact />
        <Route path="/" component={isLoggedIn ? MainTabs : Login} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
