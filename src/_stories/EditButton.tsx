import { useDispatch } from "react-redux";
import { ReactElement, useState } from "react";
import {
  trashOutline,
  createOutline,
  ellipsisHorizontalOutline,
} from "ionicons/icons";
import {
  IonItem,
  IonIcon,
  IonList,
  IonButton,
  IonPopover,
  IonText,
} from "@ionic/react";

interface Props {
  slot: string;
  deleteItem: () => void;
}

export default function EditButton({ slot, deleteItem }: Props): ReactElement {
  const dispatch = useDispatch();

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  const dismissPopover = () => {
    setShowPopover({ showPopover: false, event: undefined });
  };

  const deleteSelectedItem = () => {
    setShowPopover({ showPopover: false, event: undefined });
    deleteItem();
  };

  return (
    <>
      <IonPopover
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => dismissPopover()}
      >
        <IonList>
          <IonItem button detail={false}>
            Edit &nbsp;
            <IonIcon slot="end" icon={createOutline} />
          </IonItem>

          <IonItem button detail={false} onClick={deleteSelectedItem}>
            <IonText color="danger">Delete &nbsp;</IonText>
            <IonIcon color="danger" slot="end" icon={trashOutline} />
          </IonItem>

          <IonItem
            lines="none"
            detail={false}
            button
            onClick={() =>
              setShowPopover({ showPopover: false, event: undefined })
            }
          >
            Close
          </IonItem>
        </IonList>
      </IonPopover>
      <IonButton
        slot={slot}
        fill="solid"
        size="large"
        onClick={(e: any) => {
          e.persist();
          setShowPopover({ showPopover: true, event: e });
        }}
      >
        <IonIcon icon={ellipsisHorizontalOutline} />
      </IonButton>
    </>
  );
}
