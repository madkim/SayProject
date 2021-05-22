import {
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/react";

import LoginForm from "./LoginForm";

import { DynObject } from "../../_helpers/types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../_actions/authActions";
import { authConstants } from "../../_constants/authConstants";
import { useState, useEffect } from "react";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("uid") !== null) {
      dispatch({ type: authConstants.USER_LOGIN_SUCCESS, payload: true });
    }
  }, []);

  const validateLogin = () => {
    let errors: DynObject = {};
    if (email.length === 0) {
      errors.email = "Email is required";
    }
    if (password.length === 0) {
      errors.password = "Password is required";
    }
    setErrors(errors);

    if (!errors.email && !errors.password) {
      dispatch(authActions.logUserIn(email, password));
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
          email={email}
          errors={errors}
          password={password}
          setEmail={setEmail}
          validate={validateLogin}
          setPassword={setPassword}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
