import {
  IonCard,
  IonNote,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonLoading,
} from "@ionic/react";

import { Sets } from "../../_helpers/types";

import React, { ReactElement } from "react";

interface Props {
  sets: Sets;
  loading: boolean;
}

export default function ListSets({ sets, loading }: Props): ReactElement {
  const listShared = (shared: string[]) => {
    return shared.reduce((prev, current, index, []) => {
      return prev + ", " + current;
    });
  };

  return (
    <>
      {Object.keys(sets).length > 0 ? (
        sets.map((set) => {
          return (
            <IonCard key={set.id} button routerLink={`/set/${set.id}`}>
              <IonCardHeader color="dark">
                <IonCardTitle>{set.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="ion-text-capitalize">
                <IonNote color="dark">
                  <br />
                  <h2>Cards: 10</h2>
                  <br />
                  <h2>Owner: {set.owner}</h2>
                  <br />
                  <h2>
                    Shared:&nbsp;
                    {console.log(set.shared)}
                    {set.shared.length === 0 ? "None" : listShared(set.shared)}
                  </h2>
                </IonNote>
              </IonCardContent>
            </IonCard>
          );
        })
      ) : (
        <IonLoading
          isOpen={loading}
          message={"Please wait..."}
          duration={5000}
        />
      )}
    </>
  );
}
