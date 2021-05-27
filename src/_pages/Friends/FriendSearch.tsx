import {
  IonCol,
  IonRow,
  IonItem,
  IonList,
  IonLabel,
  IonButton,
  IonAvatar,
  IonSearchbar,
  IonSpinner,
} from "@ionic/react";

import { ReactElement, useState } from "react";
import FadeIn from "react-fade-in";

interface Props {}

export default function FriendSearch({}: Props): ReactElement {
  const [loading, setLoading] = useState(false);
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
            Search
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          {loading ? (
            <div className="ion-text-center" style={{ marginTop: "1em" }}>
              <IonSpinner name="bubbles" />
            </div>
          ) : (
            <FadeIn>
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
              </IonList>
            </FadeIn>
          )}
          <br />
        </IonCol>
      </IonRow>
      <br />
    </IonList>
  );
}
