import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonLoading,
  IonSpinner,
} from "@ionic/react";

import FadeIn from "react-fade-in";

import { Sets } from "../../../_helpers/types";
import { ReactElement } from "react";

interface Props {
  sets: Sets;
  loading: boolean;
  longPress: any;
}

export default function ListView({
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
      <IonList className="ion-margin-top">
        {Object.keys(sets).length > 0 ? (
          sets.map((set) => {
            return (
              <IonItem
                button
                key={set.id}
                detail={false}
                routerLink={`/set/${set.id}`}
                {...longPress}
              >
                <IonLabel>
                  <IonRow>
                    <IonCol>
                      <IonRow>
                        <IonCol>
                          <h2>{set.name}</h2>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol>
                          <small className="ion-text-wrap">
                            Shared:&nbsp;
                            {set.shared.length === 0
                              ? "None"
                              : listShared(set.shared)}
                          </small>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                    <IonCol size="auto">
                      <IonAvatar>
                        <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
                      </IonAvatar>
                    </IonCol>
                  </IonRow>
                </IonLabel>
              </IonItem>
            );
          })
        ) : (
          <div className="ion-text-center" style={{ marginTop: "2em" }}>
            <IonSpinner name="bubbles" />
          </div>
          // <IonLoading
          //   isOpen={loading}
          //   message={"Please wait..."}
          //   duration={5000}
          // />
        )}
      </IonList>
    </FadeIn>
  );
}
