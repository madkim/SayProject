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
} from "@ionic/react";

import { useState } from "react";
import FadeIn from "react-fade-in";

interface Props {
  password: string;
  username: string;
  validate: () => void;
  setPassword: (password: string) => void;
  setUsername: (username: string) => void;
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const [checked, setChecked] = useState(false);

  return (
    <FadeIn>
      <br />
      <IonCard>
        <IonCardHeader color="primary">
          <IonCardTitle className="ion-text-center">Login</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <br />
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
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-bottom">
            <IonCol className="ion-no-padding">
              <IonItem className="ion-padding-end">
                <IonLabel position="stacked">
                  <h1>Password</h1>
                </IonLabel>
                <IonInput
                  type={checked ? "text" : "password"}
                  value={props.password}
                  onIonChange={(e) => props.setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-vertical">
            <IonCol className="ion-no-padding">
              <IonItem lines="none" className="ion-padding-end">
                <IonToggle
                  checked={checked}
                  onIonChange={(e) => setChecked(e.detail.checked)}
                />
                <IonLabel
                  className="ion-padding-start"
                  onClick={() => {
                    setChecked(!checked);
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
                onClick={props.validate}
              >
                Login
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
