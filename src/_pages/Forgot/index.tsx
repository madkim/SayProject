import {
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/react";

import ForgotPasswordForm from "./ForgotForm";

import { useState } from "react";
import { DynObject } from "../../_helpers/types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../_actions/authActions";

interface Props {}

const ForgotPassword: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");

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
      dispatch(authActions.logUserIn(email, password, history));
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

        <ForgotPasswordForm
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

export default ForgotPassword;
