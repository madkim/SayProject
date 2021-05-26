import {
  IonCol,
  IonRow,
  IonItem,
  IonList,
  IonLabel,
  IonButton,
  IonAvatar,
  IonSearchbar,
} from "@ionic/react";

import React, { ReactElement, useState } from "react";

interface Props {}

export default function FriendSearch({}: Props): ReactElement {
  const [searchText, setSearchText] = useState("");

  const search = () => {
    // Search for friend
  };

  return (
    <IonList>
      <IonRow>
        <IonCol>
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
          ></IonSearchbar>
        </IonCol>
        <IonCol size="3" className="ion-margin-end">
          <IonButton
            fill="outline"
            color="primary"
            expand="block"
            onClick={search}
          >
            {/* {loading ? <IonSpinner name="bubbles" /> : "Search"} */}
            Search
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonList>
            <IonItem>
              <IonAvatar slot="start">
                <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
              </IonAvatar>
              <IonLabel>
                <h2>Vicky Zhen</h2>
              </IonLabel>
              <IonButton size="default" fill="clear" color="primary">
                Request
              </IonButton>
            </IonItem>
            <br />
          </IonList>
        </IonCol>
      </IonRow>
      <br />
    </IonList>
  );
}
