import {
  IonCol,
  IonRow,
  IonItem,
  IonList,
  IonLabel,
  IonAvatar,
  IonButton,
  IonSpinner,
  IonSearchbar,
} from "@ionic/react";
import { RootState } from "../../_reducers/rootReducer";
import { friendActions } from "../../_actions/friendActions";
import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FadeIn from "react-fade-in";

interface Props {}

export default function FriendSearch({}: Props): ReactElement {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const loading = useSelector((state: RootState) => state.friends.loading);
  const searchResults = useSelector((state: RootState) => state.friends.search);

  const search = () => {
    // Search for friend
    if (searchText) {
      dispatch(friendActions.getFriendSearch(searchText));
    }
  };

  return (
    <IonList>
      <IonRow>
        <IonCol>
          <IonSearchbar
            value={searchText}
            onIonClear={() => {
              dispatch(friendActions.getFriendSearch(""));
            }}
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
                {searchResults.length > 0 &&
                  searchResults.map((result: any) => {
                    return (
                      result !== undefined && (
                        <IonItem key={result.id}>
                          <IonAvatar slot="start">
                            <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
                          </IonAvatar>
                          <IonLabel>
                            <h2>{result && result.name}</h2>
                          </IonLabel>
                          <IonButton
                            size="default"
                            fill="clear"
                            color="primary"
                          >
                            Request
                          </IonButton>
                        </IonItem>
                      )
                    );
                  })}
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
