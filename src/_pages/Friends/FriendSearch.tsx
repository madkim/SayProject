import {
  IonCol,
  IonRow,
  IonItem,
  IonList,
  IonLabel,
  IonButton,
  IonAvatar,
  IonSearchbar,
  IonListHeader,
} from "@ionic/react";

import React, { ReactElement, useState } from "react";
import Select from "react-select";

interface Props {}

export default function FriendSearch({}: Props): ReactElement {
  const [searchText, setSearchText] = useState("");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <IonList>
      <IonRow style={{ height: window.screen.height / 3 }}>
        <IonCol className="ion-padding ion-margin">
          <Select options={options} />
        </IonCol>
      </IonRow>
      {/* <IonRow>
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
      </IonRow> */}
      <br />
    </IonList>
  );
}
