import {
  IonCard,
  IonNote,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";

import { Sets } from "../../_helpers/types";

import React, { ReactElement } from "react";

interface Props {
  sets: Sets;
}

export default function ListSets({ sets }: Props): ReactElement {
  return (
    <>
      {Object.keys(sets).length > 0 &&
        sets.map((set, index) => {
          return (
            <IonCard key={index} button routerLink="/sayings">
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
                  <h2>Shared:</h2>
                </IonNote>
              </IonCardContent>
            </IonCard>
          );
        })}
      {/* <IonCard button routerLink="/sayings">
        <IonCardHeader color="dark">
          <IonCardTitle>Chinese Words and Phrases</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonNote color="dark">
            <br />
            <h2>Cards: 10</h2>
            <br />
            <h2>Owner: Carmen Chen</h2>
            <br />
            <h2>Shared: Vicky Zhen</h2>
          </IonNote>
        </IonCardContent>
      </IonCard>
      <IonCard button routerLink="/sayings">
        <IonCardHeader color="dark">
          <IonCardTitle>Korean Words and Phrases</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonNote color="dark">
            <br />
            <h2>Cards: 10</h2>
            <br />
            <h2>Owner: Carmen Chen</h2>
            <br />
            <h2>Shared: Vicky Zhen</h2>
          </IonNote>
        </IonCardContent>
      </IonCard> */}
    </>
  );
}
