import {
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/react";

import { useState } from "react";
import { DynObject } from "../../_helpers/types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../_actions/authActions";

import SignupForm from "./SignupForm";

interface Props {}

const Signup: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const validateSignup = () => {
    let errors: DynObject = {};

    if (fname.length === 0) {
      errors.fname = "First name is required";
    }
    if (lname.length === 0) {
      errors.lname = "Last name is required";
    }
    if (email.length === 0) {
      errors.email = "Email is required";
    }
    if (password.length === 0) {
      errors.password = "Password is required";
    } else if (passwordValid === false) {
      errors.passwordInvalid = "Password is invalid";
    }
    setErrors(errors);

    if (!errors.fname && !errors.lname && !errors.email && !errors.password) {
      dispatch(authActions.signUserUp(fname, lname, email, password));
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

        <SignupForm
          email={email}
          fname={fname}
          lname={lname}
          errors={errors}
          password={password}
          setEmail={setEmail}
          setFname={setFname}
          setLname={setLname}
          validate={validateSignup}
          setPassword={setPassword}
          setPasswordValid={setPasswordValid}
        />
      </IonContent>
    </IonPage>
  );
};

export default Signup;
