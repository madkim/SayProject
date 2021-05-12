import React, { ReactElement } from "react";
import { DynObject } from "../_helpers/types";
import { IonNote, IonItem } from "@ionic/react";

interface Props {
  show: string;
  errors: DynObject;
}

export default function ShowError({ show, errors }: Props): any {
  if (show in errors) {
    return (
      <IonItem lines="none">
        <IonNote color="danger">{errors[show]}</IonNote>
      </IonItem>
    );
  }
  return null;
}
