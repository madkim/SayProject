import { IonActionSheet } from "@ionic/react";
import React, { ReactElement } from "react";

interface Props {
  showOptions: boolean;
  setShowOptions: (value: boolean) => void;
}

export default function ManageSet({
  showOptions,
  setShowOptions,
}: Props): ReactElement {
  return (
    <IonActionSheet
      isOpen={showOptions}
      onDidDismiss={() => setShowOptions(false)}
      buttons={[
        {
          text: "Delete",
          role: "destructive",
          handler: () => {
            console.log("Delete clicked");
          },
        },
        {
          text: "Share",
          handler: () => {
            console.log("Share clicked");
          },
        },
        {
          text: "Favorite",
          handler: () => {
            console.log("Favorite clicked");
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ]}
    ></IonActionSheet>
  );
}
