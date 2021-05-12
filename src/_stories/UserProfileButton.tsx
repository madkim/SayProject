import {
  IonItem,
  IonList,
  IonAvatar,
  IonButton,
  IonPopover,
  IonListHeader,
} from "@ionic/react";

import { logOut } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { authActions } from "../_actions/authActions";
import { ReactElement, useState } from "react";

interface Props {
  slot: string;
}

export default function UserProfileButton({ slot }: Props): ReactElement {
  const dispatch = useDispatch();

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  const dismissPopover = () => {
    setShowPopover({ showPopover: false, event: undefined });
  };

  const logout = () => {
    dispatch(authActions.logUserOut());
    dismissPopover();
  };

  return (
    <>
      <IonPopover
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => dismissPopover()}
      >
        <IonList>
          <IonListHeader>Matthew</IonListHeader>
          <IonItem button detailIcon={logOut} onClick={() => logout()}>
            Logout
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
        slot="end"
        fill="clear"
        onClick={(e: any) => {
          e.persist();
          setShowPopover({ showPopover: true, event: e });
        }}
      >
        <IonAvatar>
          <img src="https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" />
        </IonAvatar>
      </IonButton>
    </>
  );
}
