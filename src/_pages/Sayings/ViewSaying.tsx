import {
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonPage,
  IonIcon,
  IonGrid,
  IonItem,
  IonList,
  IonLabel,
  IonTitle,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";

import {
  chevronBack,
  stopCircleSharp,
  caretForwardCircle,
} from "ionicons/icons";

import { RootState } from "../../_reducers/rootReducer";
import { sayingActions } from "../../_actions/sayingActions";
import { useParams, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import EditButton from "../../_stories/EditButton";
import React, { ReactElement, useEffect } from "react";

interface Props {}

export default function ViewSaying({}: Props): ReactElement {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const set = useSelector((state: RootState) => state.set.currentSet);
  const saying = useSelector((state: RootState) => state.saying.saying);
  const history = useHistory();

  useEffect(() => {
    dispatch(sayingActions.getSayingById(id));
  }, []);

  const deleteSaying = () => {
    const answer = window.confirm("Are you sure you want to delete?");

    if (answer) {
      dispatch(sayingActions.deleteSayingById(id, history, `/set/${set.id}`));
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start" className="ion-padding">
              <IonButton routerLink={`/set/${set.id}`} routerDirection="back">
                <IonIcon icon={chevronBack} />
              </IonButton>
            </IonButtons>

            <IonTitle className="ion-text-center">
              <h2>SAY</h2>
            </IonTitle>

            <EditButton slot="end" deleteItem={deleteSaying} />
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader color="light" style={{ fontSize: "large" }}>
            How do you say:
          </IonCardHeader>
          <IonCardContent>
            <br />
            <IonText color="dark">
              <h1>{saying && saying.saying}</h1>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader color="light" style={{ fontSize: "large" }}>
            Recordings:
          </IonCardHeader>
          <IonCardContent>
            <br />
            <IonList>
              <IonRow>
                <IonCol>
                  <IonItem lines="full" style={{ padding: ".5em" }}>
                    <IonLabel>Pokémon Yellow</IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="auto">
                  <IonButton color="success" fill="outline">
                    <IonIcon icon={caretForwardCircle} />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem lines="full" style={{ padding: ".5em" }}>
                    <IonLabel>Mega Man X</IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="auto">
                  <IonButton color="success" fill="outline">
                    <IonIcon icon={caretForwardCircle} />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <br />
                  <IonButton color="danger" expand="block" fill="outline">
                    <IonIcon icon={stopCircleSharp} /> &nbsp;Add Recording
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonGrid>
          <IonRow style={{ paddingTop: "4em" }}>
            <IonCol>
              <IonButton
                fill="outline"
                color="primary"
                expand="block"
                className="ion-padding-horizontal"
                routerLink={`/set/${set.id}`}
                routerDirection="back"
              >
                Done
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
