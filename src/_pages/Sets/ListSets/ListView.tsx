import {
  IonRow,
  IonCol,
  IonCard,
  IonNote,
  IonAvatar,
  IonLoading,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";

import FadeIn from "react-fade-in";

import { Sets } from "../../../_helpers/types";
import { useLongPress } from "use-long-press";
import { ReactElement, useState } from "react";

interface Props {
  sets: Sets;
  loading: boolean;
}

export default function ListView({ sets, loading }: Props): ReactElement {
  const listShared = (shared: string[]) => {
    return shared.reduce((prev, current, index, []) => {
      return prev + ", " + current;
    });
  };

  return (
    <FadeIn>
      <IonList>
        {Object.keys(sets).length > 0 ? (
          sets.map((set) => {
            return (
              <IonItem
                detail
                button
                key={set.id}
                routerLink={`/view/${set.id}`}
              >
                <IonLabel className="ion-padding-vertical">
                  <IonRow>
                    <IonCol size="auto">
                      <small>Cards: {set.count}</small>
                    </IonCol>

                    <IonCol>
                      <small>Owner: {set.owner}</small>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <h1>{set.name}</h1>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <small className="ion-text-wrap">
                        Shared:&nbsp;
                        {set.shared.length === 0
                          ? "None"
                          : listShared(set.shared)}
                      </small>
                    </IonCol>
                  </IonRow>
                </IonLabel>
              </IonItem>
            );
          })
        ) : (
          <IonLoading
            isOpen={loading}
            message={"Please wait..."}
            duration={5000}
          />
        )}
      </IonList>
    </FadeIn>
  );
}
