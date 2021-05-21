import React, { ReactElement } from "react";
import { stopCircle, trash } from "ionicons/icons";
import { IonIcon, IonButton, IonSpinner } from "@ionic/react";

interface Props {
  id: string;
  recording: boolean;
  hasRecording: boolean;
  selectedSaying: string;
  record: (id: string) => void;
  deleteRecording: (id: string) => void;
}

export default function RecordDeleteButton({
  id,
  record,
  recording,
  hasRecording,
  selectedSaying,
  deleteRecording,
}: Props): ReactElement {
  return (
    <>
      {hasRecording ? (
        <IonButton
          color="danger"
          fill="outline"
          expand="block"
          onClick={() => deleteRecording(id)}
        >
          <IonIcon icon={trash} />
        </IonButton>
      ) : (
        <IonButton
          fill="outline"
          color="danger"
          expand="block"
          onClick={() => record(id)}
        >
          {recording && selectedSaying === id ? (
            <IonSpinner color="danger" name="bubbles" />
          ) : (
            <IonIcon icon={stopCircle} />
          )}
        </IonButton>
      )}
    </>
  );
}
