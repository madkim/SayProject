import {
  IonRow,
  IonCol,
  IonCard,
  IonNote,
  IonAvatar,
  IonLoading,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";

import FadeIn from "react-fade-in";
import { Sets } from "../../../_helpers/types";
import { ReactElement } from "react";

interface Props {
  sets: Sets;
  loading: boolean;
  longPress: any;
}

export default function CardView({
  sets,
  loading,
  longPress,
}: Props): ReactElement {
  const listShared = (shared: string[]) => {
    return shared.reduce((prev, current, index, []) => {
      return prev + ", " + current;
    });
  };

  return (
    <FadeIn>
      {Object.keys(sets).length > 0 ? (
        sets.map((set) => {
          return (
            <IonCard
              key={set.id}
              button
              routerLink={`/set/${set.id}`}
              {...longPress}
            >
              <IonCardHeader color="dark">
                <IonRow>
                  <IonCol>
                    <IonCardTitle>{set.name}</IonCardTitle>
                  </IonCol>
                  <IonCol size="auto">
                    <IonAvatar>
                      <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
                    </IonAvatar>
                  </IonCol>
                </IonRow>
              </IonCardHeader>
              <IonCardContent className="ion-text-capitalize">
                <IonNote color="dark">
                  <br />
                  <h2>Cards: {set.count}</h2>
                  <br />
                  <h2>Owner: {set.owner}</h2>
                  <br />
                  <h2>
                    Shared:&nbsp;
                    {set.shared.length === 0 ? "None" : listShared(set.shared)}
                  </h2>
                </IonNote>
              </IonCardContent>
            </IonCard>
          );
        })
      ) : (
        <IonLoading
          isOpen={loading}
          message={"Please wait..."}
          duration={5000}
        />
      )}
    </FadeIn>
  );
}
