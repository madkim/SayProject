import React, { ReactElement } from "react";
import { IonIcon, IonButton } from "@ionic/react";
import { caretForwardCircle, pauseCircleOutline } from "ionicons/icons";

interface Props {
  id: string;
  playing: boolean;
  selectedSaying: string;
  listen: (id: string) => void;
}

export default function PlayPauseButton({
  id,
  listen,
  playing,
  selectedSaying,
}: Props): ReactElement {
  return (
    <>
      {playing && selectedSaying === id ? (
        <IonButton
          color="warning"
          fill="outline"
          expand="block"
          onClick={() => listen(id)}
        >
          <IonIcon icon={pauseCircleOutline} />
        </IonButton>
      ) : (
        <IonButton
          color="success"
          fill="outline"
          expand="block"
          onClick={() => listen(id)}
        >
          <IonIcon icon={caretForwardCircle} />
        </IonButton>
      )}
    </>
  );
}
