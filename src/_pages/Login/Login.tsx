import {
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/react";

import LoginForm from "./LoginForm";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../_actions/authActions";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateLogin = () => {
    if (username && password) {
      dispatch(authActions.logUserIn(username, password, history));
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary" className="ion-padding-top">
            <IonTitle size="large" className="ion-text-center">
              SAY
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <LoginForm
          username={username}
          password={password}
          validate={validateLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
