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

import React, { ReactElement, useState } from "react";
import { checkmark, closeOutline } from "ionicons/icons";

interface Props {}

export default function SayingCards({}: Props): ReactElement {
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
              <IonItem detail button routerLink="/view">
                <IonLabel className="ion-padding-vertical">
                  <IonRow>
                    <IonCol size="auto">
                      <small>April 12th 2021</small>
                    </IonCol>

                    <IonCol>
                      <small>
                        <IonNote color="danger">&nbsp;No Recording</IonNote>
                      </small>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <div className="ion-text-wrap">
                        <h1>
                          Hello, my name is Matthew. I am a traveler from
                          America looking for the bathroom.
                        </h1>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonLabel>
              </IonItem>
              <IonItem detail button routerLink="/view">
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
              </IonItem>
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </FadeIn>
  );
}
