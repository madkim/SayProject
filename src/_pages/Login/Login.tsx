import {
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCardHeader,
  IonCard,
} from "@ionic/react";

import LoginForm from "./LoginForm";

import { useState } from "react";
import { DynObject } from "../../_helpers/types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../_actions/authActions";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateLogin = () => {
    let errors: DynObject = {};
    if (username.length === 0) {
      errors.username = "Username is required";
    }
    if (password.length === 0) {
      errors.password = "Password is required";
    }
    setErrors(errors);

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
          errors={errors}
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
