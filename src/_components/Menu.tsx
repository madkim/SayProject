import React from "react";
import { withRouter } from "react-router";

import {
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonContent,
  IonMenuToggle,
} from "@ionic/react";

import { people } from "ionicons/icons";

const Menu: React.FC = () => {
  return (
    <IonMenu type="overlay" content-id="main">
      <IonHeader>
        <IonToolbar
          color="primary"
          className="ion-padding-horizontal"
          style={{ paddingBottom: ".2em" }}
        >
          <h1>
            <IonLabel>Menu</IonLabel>
          </h1>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/friends" routerDirection="root">
              <IonIcon slot="start" icon={people}></IonIcon>
              <h3 style={{ padding: "10px" }}>
                <IonLabel>Friends</IonLabel>
              </h3>
            </IonItem>
          </IonMenuToggle>
          {/* <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/manage/budget" routerDirection="root">
              <IonIcon slot="start" icon={statsChartOutline}></IonIcon>
              <h3 style={{ padding: "10px" }}>
                <IonLabel>Manage Budget</IonLabel>
              </h3>
            </IonItem>
          </IonMenuToggle> */}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
