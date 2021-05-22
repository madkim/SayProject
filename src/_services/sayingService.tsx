import { db } from "../_helpers/firebase";
import { Saying } from "../_helpers/types";
import { fireStorage } from "../_helpers/firebase";

import moment from "moment";
import firebase from "firebase/app";

export const sayingService = {
  getAll,
  addSaying,
  getSaying,
  getSayings,
  deleteSaying,
  saveRecording,
};

function getAll() {
  return new Promise(async (resolve: (sayings: Saying[]) => void) => {
    const userId = localStorage.getItem("uid");

    if (userId !== null) {
      const sayingsRef = await db
        .collection("sayings")
        .where("owner", "==", userId)
        .orderBy("createdAt", "desc")
        .get();

      const sayings = sayingsRef.docs.map(async (saying) => {
        let setName = "";
        let recording = "";

        if (saying.data().hasRecording) {
          recording = await fireStorage
            .child(`sayings/${saying.data().set}/${saying.id}`)
            .getDownloadURL();
        }

        if (saying.data().set) {
          const set = await db.collection("sets").doc(saying.data().set).get();
          setName = set.data()!.name;
        }

        return {
          id: saying.id,
          set: setName,
          owner: saying.data().owner,
          saying: saying.data().saying,
          createdAt: saying.data().createdAt.toDate(),
          recording: recording,
          hasRecording: saying.data().hasRecording,
        };
      });

      Promise.all(sayings).then((values) => {
        resolve(values);
      });
    } else {
      //logout
    }
  });
}

function saveRecording(recording: string, sayingId: string, setId: string) {
  return new Promise(async (resolve: (saying: Saying) => void) => {
    const userId = localStorage.getItem("uid");

    if (userId !== null) {
      fireStorage
        .child(`sayings/${setId}/${sayingId}`)
        .putString(recording, firebase.storage.StringFormat.DATA_URL)
        .then(() => {
          db.collection("sayings").doc(sayingId).update({ hasRecording: true });
          getSayings(setId);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // logout
    }
  });
}

function addSaying(saying: string, setId: string) {
  return new Promise(async (resolve: (saying: Saying) => void, reject) => {
    const userId = localStorage.getItem("uid");

    if (userId !== null) {
      const sayingRef = await db.collection("sayings").add({
        createdAt: new Date(),
        hasRecording: false,
        owner: userId,
        saying: saying,
        set: setId,
      });

      resolve({
        id: sayingRef.id,
        set: setId,
        owner: userId,
        saying: saying,
        createdAt: moment(new Date()).format("MMM Do YYYY"),
        recording: "",
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

    let recording = "";

    if (sayingRef.data()!.hasRecording) {
      recording = await fireStorage
        .child(`sayings/${sayingRef.data()!.set}/${id}`)
        .getDownloadURL();
    }

    resolve({
      id: sayingRef.id,
      set: sayingRef.data()!.set,
      owner: sayingRef.data()!.owner,
      saying: sayingRef.data()!.saying,
      createdAt: sayingRef.data()!.createdAt.toDate(),
      recording: recording,
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

    const sayings = sayingsRef.docs.map(async (saying) => {
      let recording = "";

      if (saying.data().hasRecording) {
        recording = await fireStorage
          .child(`sayings/${saying.data().set}/${saying.id}`)
          .getDownloadURL();
      }

      return {
        id: saying.id,
        set: saying.data().set,
        owner: saying.data().owner,
        saying: saying.data().saying,
        createdAt: saying.data().createdAt.toDate(),
        recording: recording,
        hasRecording: saying.data().hasRecording,
      };
    });

    Promise.all(sayings).then((values) => {
      resolve(values);
    });
  });
}

function deleteSaying(id: string) {
  return db.collection("sayings").doc(id).delete();
}
