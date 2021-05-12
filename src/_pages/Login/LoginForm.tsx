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

import { useState } from "react";
import { DynObject } from "../../_helpers/types";
import { RootState } from "../../_reducers/rootReducer";
import { useSelector } from "react-redux";

import FadeIn from "react-fade-in";
import ShowError from "../../_stories/ShowError";

interface Props {
  errors: DynObject;
  password: string;
  username: string;
  validate: () => void;
  setPassword: (password: string) => void;
  setUsername: (username: string) => void;
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const loading = useSelector((state: RootState) => state.auth.loading);
  const loginFailed = useSelector((state: RootState) => state.auth.loginFailed);

  const [showPassword, setShowPassword] = useState(
    localStorage.getItem("showPassword") === "true" ? true : false
  );

  const toggleShowPassword = (checked: boolean) => {
    localStorage.setItem("showPassword", checked ? "true" : "false");
    setShowPassword(checked);
  };

  return (
    <FadeIn>
      <br />
      <IonCard>
        <IonCardHeader color="primary">
          <IonCardTitle className="ion-text-center">Login</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <br />
          {loginFailed && (
            <IonCardHeader color="danger">
              Invalid Login Credentials
            </IonCardHeader>
          )}

          <IonRow className="ion-padding-vertical">
            <IonCol className="ion-no-padding">
              <IonItem className="ion-padding-end">
                <IonLabel position="stacked">
                  <h1>Username</h1>
                </IonLabel>
                <IonInput
                  value={props.username}
                  onIonChange={(e) => props.setUsername(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <ShowError show={"username"} errors={props.errors} />
            </IonCol>
          </IonRow>
          <IonRow className={`${!showPassword && "ion-padding-bottom"}`}>
            <IonCol className="ion-no-padding">
              <IonItem className="ion-padding-end">
                <IonLabel position="stacked">
                  <h1>Password</h1>
                </IonLabel>
                <IonInput
                  type="password"
                  value={props.password}
                  onIonChange={(e) => props.setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
              {showPassword && (
                <IonItem lines="none">
                  <IonInput
                    type="text"
                    readonly
                    value={props.password}
                  ></IonInput>
                </IonItem>
              )}
              <ShowError show={"password"} errors={props.errors} />
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
                size="large"
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
              <IonButton fill="clear" color="primary" expand="block">
                Forgot Username
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton fill="clear" color="primary" expand="block">
                Forgot Password
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>
    </FadeIn>
  );
};

export default LoginForm;
