import {
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonSelect,
  IonSegment,
  IonSegmentButton,
  IonSelectOption,
} from "@ionic/react";

import FadeIn from "react-fade-in";
import ListView from "./ListView";
import CardView from "./CardView";
import ManageSet from "../ManageSet";

import { Sets } from "../../../_helpers/types";
import { useLongPress } from "use-long-press";
import { ReactElement, useState } from "react";
import { albums, listCircle } from "ionicons/icons";

interface Props {
  sets: Sets;
  loading: boolean;
}

export default function ListSets({ sets, loading }: Props): ReactElement {
  const [showSetOptions, setShowSetOptions] = useState(false);
  const [viewType, setViewType] = useState("card");

  const longPress = useLongPress(() => {
    setShowSetOptions(true);
  });

  return (
    <>
      <ManageSet
        showOptions={showSetOptions}
        setShowOptions={setShowSetOptions}
      />
      <FadeIn>
        <IonRow>
          <IonCol className="ion-margin-top ion-margin-horizontal">
            <IonCard className="ion-no-margin" style={{ color: "black" }}>
              <IonSegment
                value={viewType}
                onIonChange={(e) => setViewType(e.detail.value!)}
              >
                <IonSegmentButton value="card">
                  <IonIcon icon={albums} />
                </IonSegmentButton>
                <IonSegmentButton value="list">
                  <IonIcon icon={listCircle} />
                </IonSegmentButton>
              </IonSegment>
            </IonCard>
          </IonCol>
          <IonCol className="ion-margin-horizontal ion-margin-top">
            <IonCard className="ion-no-margin" style={{ color: "black" }}>
              <IonSelect value="own" interface="popover">
                <IonSelectOption value="own">My Sets</IonSelectOption>
                <IonSelectOption value="shared">Shared Sets</IonSelectOption>
                <IonSelectOption value="favorites">Favorites</IonSelectOption>
              </IonSelect>
            </IonCard>
          </IonCol>
        </IonRow>

        {viewType === "card" && (
          <CardView sets={sets} loading={loading} longPress={longPress} />
        )}
        {viewType === "list" && <ListView sets={sets} loading={loading} />}
      </FadeIn>
    </>
  );
}
