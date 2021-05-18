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
  const [searchText, setSearchText] = useState("");

  return (
    <FadeIn>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
            ></IonSearchbar>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonList>
              {Object.keys(sayings).length > 0 &&
                sayings.map((saying) => {
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
                            {/* <small>April 12th 2021</small> */}
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
              {/* <IonItem detail button routerLink="/view">
                <IonLabel className="ion-padding-vertical">
                  <IonRow>
                    <IonCol>
                      <small>April 8th 2021</small>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <div className="ion-text-wrap">
                        <h1>
                          This is another phrase I want to know how to say.
                        </h1>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonLabel>
              </IonItem> */}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </FadeIn>
  );
}
