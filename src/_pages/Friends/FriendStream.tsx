import FadeIn from "react-fade-in";
import Sayings from "../Home/Sayings";
import SayingCards from "../Home/SayingCards";
import { IonCard } from "@ionic/react";

const FriendStream: React.FC = () => {
  return (
    <>
      <SayingCards />
      <div>
        <IonCard
          className="ion-padding"
          style={{ position: "fixed", bottom: "1em" }}
        >
          <Sayings />
        </IonCard>
      </div>
    </>
  );
};

export default FriendStream;
