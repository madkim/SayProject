import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonButton,
  IonTextarea,
} from "@ionic/react";

import React, { ReactElement, useState } from "react";
interface Props {}

export default function Sayings({}: Props): ReactElement {
  const [saying, setSaying] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">How do you SAY?</IonLabel>
            <IonTextarea
              value={saying}
              onBlur={() => setFocused(false)}
              onFocus={() => setFocused(true)}
              placeholder="What do you want to know?"
              onIonChange={(e) => setSaying(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </IonCol>
        <IonCol
          size="3"
          className="ion-no-padding"
          style={{ padding: "2em 1em 0em 0em" }}
        >
          <IonButton
            color="primary"
            expand="block"
            onClick={() => {
              console.log("clicked");
            }}
          >
            ASK
          </IonButton>
        </IonCol>
      </IonRow>
    </>
  );
}
