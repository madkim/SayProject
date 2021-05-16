import {
  IonRow,
  IonCol,
  IonNote,
  IonCard,
  IonIcon,
  IonButton,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonItem,
  IonText,
} from "@ionic/react";

import {
  add,
  caretForward,
  caretForwardCircle,
  chevronForward,
  closeCircleSharp,
  play,
  playSkipForwardCircleOutline,
  stopCircle,
  volumeHigh,
} from "ionicons/icons";

import FadeIn from "react-fade-in";
import { useHistory } from "react-router-dom";
import React, { ReactElement, useState } from "react";

interface Props {}

export default function SayingCards({}: Props): ReactElement {
  const history = useHistory();

  const listen = (e: any) => {};

  return (
    <>
      <IonCard>
        <IonCardHeader style={{ fontSize: "large", fontWeight: "700" }}>
          <IonRow>
            <IonCol onClick={() => history.push("/view")}>
              <IonText color="dark">I need to use the restroom.</IonText>
            </IonCol>
            <IonCol size="auto">
              <IonButton
                color="danger"
                fill="outline"
                expand="block"
                routerLink="/view"
              >
                <IonIcon icon={stopCircle} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardHeader>
      </IonCard>
      <IonCard>
        <IonCardHeader style={{ fontSize: "large", fontWeight: "700" }}>
          <IonRow>
            <IonCol onClick={() => history.push("/view")}>
              <IonText color="dark">Hello, my name is Matthew Kim.</IonText>
            </IonCol>
            <IonCol size="auto">
              <IonButton
                color="success"
                fill="outline"
                expand="block"
                onClick={listen}
              >
                <IonIcon icon={caretForwardCircle} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardHeader>
      </IonCard>
    </>
  );
}
