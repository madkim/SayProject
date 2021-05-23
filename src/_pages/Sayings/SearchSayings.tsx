import {
  IonRow,
  IonCol,
  IonList,
  IonGrid,
  IonItem,
  IonNote,
  IonLabel,
  IonSearchbar,
} from "@ionic/react";

import FadeIn from "react-fade-in";
import moment from "moment";

import { Saying } from "../../_helpers/types";
import React, { ReactElement, useState } from "react";

interface Props {
  sayings: Saying[];
}

export default function SayingCards({ sayings }: Props): ReactElement {
  const [search, setSearch] = useState("");

  return (
    <FadeIn>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonSearchbar
              value={search}
              onIonChange={(e) => setSearch(e.detail.value!)}
            ></IonSearchbar>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonList>
              {Object.keys(sayings).length > 0 &&
                sayings
                  .filter((saying) =>
                    search !== ""
                      ? saying.saying
                          .toLowerCase()
                          .trim()
                          .includes(search.toLowerCase().trim())
                      : saying
                  )
                  .map((saying) => {
                    return (
                      <IonItem
                        detail
                        button
                        key={saying.id}
                        routerLink={`/view/${saying.id}`}
                      >
                        <IonLabel className="ion-padding-vertical">
                          <IonRow>
                            <IonCol size="auto">
                              <small>
                                {moment(saying.createdAt).format("MMM Do YYYY")}
                              </small>
                            </IonCol>

                            {saying.hasRecording === false && (
                              <IonCol>
                                <small>
                                  <IonNote color="danger">
                                    &nbsp;No Recording
                                  </IonNote>
                                </small>
                              </IonCol>
                            )}
                          </IonRow>

                          <IonRow>
                            <IonCol>
                              <div className="ion-text-wrap">
                                <h1>{saying.saying}</h1>
                              </div>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonItem>
                    );
                  })}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </FadeIn>
  );
}
