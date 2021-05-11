import {
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/react";

const ListSayings: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="primary" style={{ padding: "1em" }}>
            <IonTitle size="large" className="ion-text-center">
              SAY
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default ListSayings;
