import {
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";

import { DynObject } from "../../_helpers/types";
import { RootState } from "../../_reducers/rootReducer";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";

import FadeIn from "react-fade-in";
import ShowError from "../../_stories/ShowError";
import PasswordChecklist from "../../_stories/PasswordChecklist";
import { useHistory } from "react-router";

interface Props {
  email: string;
  fname: string;
  lname: string;
  errors: DynObject;
  password: string;
  validate: () => void;
  setFname: (name: string) => void;
  setLname: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPasswordValid: (isValid: boolean) => void;
}

type Ref = React.RefObject<HTMLIonInputElement>;

const LoginForm: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const lnameRef: Ref = useRef(null);
  const emailRef: Ref = useRef(null);
  const passRef: Ref = useRef(null);

  const loading = useSelector((state: RootState) => state.auth.loading);

  const redirectLogin = () => {
    if (
      props.email.length > 0 ||
      props.fname.length > 0 ||
      props.lname.length > 0 ||
      props.password.length > 0
    ) {
      const answer = window.confirm(
        "Are you sure you want to leave? Your progress will not be saved."
      );
      if (answer) {
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
  };

  const jumpToNextInput = (ref: Ref) => {
    ref.current!.getInputElement().then((element) => {
      element.focus();
    });
  };

  const validate = () => {
    passRef.current!.getInputElement().then((element) => {
      element.blur();
      props.validate();
    });
  };

  return (
    <FadeIn>
      <IonCard>
        <IonCardHeader color="primary">
          <IonCardTitle className="ion-text-center">
            Create Account
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <br />

          <IonRow className="ion-padding-vertical">
            <IonCol className="ion-no-padding">
              <IonItem className="ion-padding-end">
                <IonLabel position="stacked">
                  <h2>First Name:</h2>
                </IonLabel>
                <IonInput
                  value={props.fname}
                  className="ion-text-capitalize"
                  onKeyDown={(e) =>
                    e.key === "Enter" ? jumpToNextInput(lnameRef) : ""
                  }
                  onIonChange={(e) => props.setFname(e.detail.value!)}
                ></IonInput>
              </IonItem>

              {props.fname.trim() === "" && (
                <ShowError show={"fname"} errors={props.errors} />
              )}
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-vertical">
            <IonCol className="ion-no-padding">
              <IonItem className="ion-padding-end">
                <IonLabel position="stacked">
                  <h2>Last Name:</h2>
                </IonLabel>
                <IonInput
                  ref={lnameRef}
                  value={props.lname}
                  className="ion-text-capitalize"
                  onKeyDown={(e) =>
                    e.key === "Enter" ? jumpToNextInput(emailRef) : ""
                  }
                  onIonChange={(e) => props.setLname(e.detail.value!)}
                ></IonInput>
              </IonItem>

              {props.lname.trim() === "" && (
                <ShowError show={"lname"} errors={props.errors} />
              )}
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-vertical">
            <IonCol className="ion-no-padding">
              <IonItem className="ion-padding-end">
                <IonLabel position="stacked">
                  <h2>Email:</h2>
                </IonLabel>
                <IonInput
                  ref={emailRef}
                  type="email"
                  autocomplete="email"
                  value={props.email}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? jumpToNextInput(passRef) : ""
                  }
                  onIonChange={(e) => props.setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>

              {props.email.trim() === "" && (
                <ShowError show={"email"} errors={props.errors} />
              )}
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-vertical">
            <IonCol className="ion-no-padding">
              <IonItem className="ion-padding-end">
                <IonLabel position="stacked">
                  <h2>Password:</h2>
                </IonLabel>
                <IonInput
                  ref={passRef}
                  type="text"
                  value={props.password}
                  onKeyDown={(e) => (e.key === "Enter" ? validate() : "")}
                  onIonChange={(e) => props.setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <ShowError show={"passwordInvalid"} errors={props.errors} />

              {props.password.trim() === "" && (
                <ShowError show={"password"} errors={props.errors} />
              )}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-padding-start">
              <PasswordChecklist
                password={props.password}
                isValid={props.setPasswordValid}
              />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                fill="solid"
                color="primary"
                expand="block"
                disabled={loading}
                onClick={props.validate}
              >
                {loading ? <IonSpinner name="bubbles" /> : "Create"}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardContent>
        <IonRow>
          <IonCol className="ion-text-center">
            <IonButton
              fill="clear"
              size="small"
              color="primary"
              onClick={redirectLogin}
            >
              Login
            </IonButton>
          </IonCol>
        </IonRow>
        <br />
      </IonCard>
      <br />
    </FadeIn>
  );
};

export default LoginForm;
