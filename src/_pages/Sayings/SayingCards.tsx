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
import { Saying } from "../../_helpers/types";
import { useHistory } from "react-router-dom";
import React, { ReactElement, useState } from "react";

interface Props {
  sayings: Saying[];
}

export default function SayingCards({ sayings }: Props): ReactElement {
  const history = useHistory();

  const listen = () => {
    // Listen to Recording
  };

  return (
    <>
      {Object.keys(sayings).length > 0 &&
        sayings.map((saying, index) => {
          return (
            <IonCard key={saying.id}>
              <IonCardHeader style={{ fontSize: "large", fontWeight: "700" }}>
                <IonRow>
                  <IonCol onClick={() => history.push(`/view/${saying.id}`)}>
                    <IonText color="dark">{saying.saying}</IonText>
                  </IonCol>
                  <IonCol size="auto">
                    {saying.hasRecording ? (
                      <IonButton
                        color="success"
                        fill="outline"
                        expand="block"
                        onClick={listen}
                      >
                        <IonIcon icon={caretForwardCircle} />
                      </IonButton>
                    ) : (
                      <IonButton
                        fill="outline"
                        color="danger"
                        expand="block"
                        routerLink={`/view/${saying.id}`}
                      >
                        <IonIcon icon={stopCircle} />
                      </IonButton>
                    )}
                  </IonCol>
                </IonRow>
              </IonCardHeader>
            </IonCard>
          );
        })}
    </>
  );
}
