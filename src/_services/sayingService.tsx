import { db } from "../_helpers/firebase";
import { Saying } from "../_helpers/types";
import { fireAuth } from "../_helpers/firebase";
import moment from "moment";

export const sayingService = {
  addSaying,
  getSaying,
  getSayings,
  deleteSaying,
};

function addSaying(saying: string, setId: string) {
  return new Promise(async (resolve: (saying: Saying) => void, reject) => {
    const user = fireAuth.currentUser;

    if (user) {
      const sayingRef = await db.collection("sayings").add({
        createdAt: new Date(),
        hasRecording: false,
        owner: user.uid,
        saying: saying,
        set: setId,
      });

      resolve({
        id: sayingRef.id,
        set: setId,
        owner: user.uid,
        saying: saying,
        createdAt: moment(new Date()).format("MMM Do YYYY"),
        hasRecording: false,
      });
    } else {
      // logout
    }
  });
}

function getSaying(id: string) {
  return new Promise(async (resolve: (saying: Saying) => void, reject) => {
    const sayingRef = await db.collection("sayings").doc(id).get();

    resolve({
      id: sayingRef.id,
      set: sayingRef.data()!.set,
      owner: sayingRef.data()!.owner,
      saying: sayingRef.data()!.saying,
      createdAt: sayingRef.data()!.createdAt.toDate(),
      hasRecording: sayingRef.data()!.hasRecording,
    });
  });
}

function getSayings(id: string) {
  return new Promise(async (resolve: (sayings: Saying[]) => void, reject) => {
    const sayingsRef = await db
      .collection("sayings")
      .where("set", "==", id)
      .get();

    const sayings = sayingsRef.docs.map((saying) => {
      return {
        id: saying.id,
        set: saying.data().set,
        owner: saying.data().owner,
        saying: saying.data().saying,
        createdAt: saying.data().createdAt.toDate(),
        hasRecording: saying.data().hasRecording,
      };
    });
    resolve(sayings);
  });
}

function deleteSaying(id: string) {
  return db.collection("sayings").doc(id).delete();
}
