import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonButton,
  IonSpinner,
  IonTextarea,
} from "@ionic/react";

import { RootState } from "../../_reducers/rootReducer";
import { useSelector } from "react-redux";

import React, { ReactElement, useState } from "react";
import ShowError from "../../_stories/ShowError";
import { DynObject } from "../../_helpers/types";

interface Props {
  addNewSaying: (saying: string) => void;
}

export default function Sayings({ addNewSaying }: Props): ReactElement {
  const [saying, setSaying] = useState("");
  const [errors, setErrors] = useState<DynObject>({});
  const [clicked, setClicked] = useState(false);

  const loading = useSelector((state: RootState) => state.saying.loading);

  const addSaying = (saying: string) => {
    setErrors({});
    setClicked(true);
    if (saying !== "") {
      addNewSaying(saying);
      setSaying("");
    } else {
      setErrors({ saying: "Enter a saying." });
    }
  };

  return (
    <>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">How do you SAY?</IonLabel>
            <IonTextarea
              value={saying}
              placeholder="What do you want to know?"
              onIonChange={(e) => setSaying(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          <ShowError show={"saying"} errors={errors} />
        </IonCol>
        <IonCol size="3" style={{ padding: "2.5em .5em 0em 0em" }}>
          <IonButton
            fill="outline"
            color="primary"
            expand="block"
            onClick={() => addSaying(saying)}
          >
            {loading && clicked ? <IonSpinner name="bubbles" /> : "ASK"}
          </IonButton>
        </IonCol>
      </IonRow>
    </>
  );
}
