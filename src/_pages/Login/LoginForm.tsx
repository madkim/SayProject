import {
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToggle,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonSpinner,
} from "@ionic/react";

import { DynObject } from "../../_helpers/types";
import { RootState } from "../../_reducers/rootReducer";
import { useSelector } from "react-redux";
import React, { useState, useRef } from "react";

import FadeIn from "react-fade-in";
import ShowError from "../../_stories/ShowError";

interface Props {
  email: string;
  errors: DynObject;
  password: string;
  validate: () => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

type Ref = React.RefObject<HTMLIonInputElement>;

const LoginForm: React.FC<Props> = (props: Props) => {
  const passRef: Ref = useRef(null);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const loginFailed = useSelector((state: RootState) => state.auth.loginFailed);

  const [showPassword, setShowPassword] = useState(
    localStorage.getItem("showPassword") === "true" ? true : false
  );

  const toggleShowPassword = (checked: boolean) => {
    localStorage.setItem("showPassword", checked ? "true" : "false");
    setShowPassword(checked);
  };

  const jumpToNextInput = () => {
    passRef.current!.getInputElement().then((element) => {
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
          <IonCardTitle className="ion-text-center">Login</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <br />
          {loginFailed && (
            <FadeIn>
              <IonCardHeader color="danger">
                Invalid Login Credentials
              </IonCardHeader>
            </FadeIn>
          )}

          <IonRow className="ion-padding-vertical">
            <IonCol className="ion-no-padding">
              <IonItem className="ion-padding-end">
                <IonLabel position="stacked">
                  <h2>Email</h2>
                </IonLabel>
                <IonInput
                  type="email"
                  value={props.email}
                  clearOnEdit={false}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? jumpToNextInput() : ""
                  }
                  onIonChange={(e) => props.setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>

              {props.email === "" && (
                <ShowError show={"email"} errors={props.errors} />
              )}

              <br />
            </IonCol>
          </IonRow>
          <IonRow className={`${!showPassword && "ion-padding-bottom"}`}>
            <IonCol className="ion-no-padding">
              <IonItem className="ion-padding-end">
                <IonLabel position="stacked">
                  <h2>Password</h2>
                </IonLabel>
                <IonInput
                  ref={passRef}
                  type="password"
                  enterkeyhint="enter"
                  clearOnEdit={false}
                  value={props.password}
                  onKeyDown={(e) => (e.key === "Enter" ? validate() : "")}
                  onIonChange={(e) => props.setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>

              {props.password === "" && (
                <ShowError show={"password"} errors={props.errors} />
              )}

              {showPassword && (
                <IonItem lines="none">
                  <IonInput
                    type="text"
                    readonly
                    value={props.password}
                  ></IonInput>
                </IonItem>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-vertical">
            <IonCol className="ion-no-padding">
              <IonItem lines="none" className="ion-padding-end">
                <IonToggle
                  checked={showPassword}
                  onIonChange={(e) => toggleShowPassword(e.detail.checked!)}
                />
                <IonLabel
                  className="ion-padding-start"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  Show Password
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <br />

          <IonRow className="ion-padding-bottom">
            <IonCol>
              <IonButton
                fill="solid"
                color="primary"
                expand="block"
                disabled={loading}
                onClick={props.validate}
              >
                {loading ? <IonSpinner name="bubbles" /> : "Login"}
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonButton
                size="small"
                fill="clear"
                color="primary"
                expand="block"
              >
                Forgot Password
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton
                size="small"
                fill="clear"
                color="primary"
                expand="block"
                routerLink="/signup"
              >
                Create An Account
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>
      <br />
    </FadeIn>
  );
};

export default LoginForm;
