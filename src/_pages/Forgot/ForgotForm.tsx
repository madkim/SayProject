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
  findUser: () => void;
  setEmail: (email: string) => void;
}

type Ref = React.RefObject<HTMLIonInputElement>;

const ForgotPasswordForm: React.FC<Props> = (props: Props) => {
  const emailRef: Ref = useRef(null);
  const loading = useSelector((state: RootState) => state.auth.loading);

  const findUser = () => {
    emailRef.current!.getInputElement().then((element) => {
      element.blur();
      props.findUser();
    });
  };

  return (
    <FadeIn>
      <IonCard>
        <IonCardHeader color="primary">
          <IonCardTitle className="ion-text-center">
            Forgot Password
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <br />

          {/* <FadeIn>
            <IonCardHeader color="danger">
              Email not found. Please use a different email or create an
              account.
            </IonCardHeader>
          </FadeIn> */}

          <IonRow className="ion-padding-vertical">
            <IonCol className="ion-no-padding">
              <IonItem className="ion-padding-end">
                <IonLabel position="stacked">
                  <h2>Email</h2>
                </IonLabel>
                <IonInput
                  ref={emailRef}
                  type="email"
                  placeholder="Please enter your email"
                  value={props.email}
                  clearOnEdit={false}
                  onKeyDown={(e) => (e.key === "Enter" ? findUser() : "")}
                  onIonChange={(e) => props.setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>

              {props.email === "" && (
                <ShowError show={"email"} errors={props.errors} />
              )}
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
                onClick={findUser}
              >
                Find Account
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
                routerLink="/login"
              >
                Login
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

export default ForgotPasswordForm;