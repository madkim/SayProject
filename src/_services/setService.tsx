import { db } from "../_helpers/firebase";
import { fireAuth } from "../_helpers/firebase";
import { CurrentSet, Set, Sets } from "../_helpers/types";
import moment from "moment";

export const setService = {
  add,
  getSet,
  getSets,
};

function getSet(id: string) {
  return new Promise(async (resolve: (set: CurrentSet) => void, reject) => {
    const user = fireAuth.currentUser;

    if (user) {
      const set = await db.collection("sets").doc(id).get();

      const sayings = await db
        .collection("sayings")
        .where("set", "==", id)
        .get();

      const setSayings = sayings.docs.map((saying) => {
        return {
          id: saying.id,
          set: saying.data().set,
          owner: saying.data().owner,
          saying: saying.data().saying,
          createdAt: saying.data().createdAt.toDate(),
          hasRecording: saying.data().hasRecording,
        };
      });

      let currentSet = {
        set: {
          id: id,
          name: set.data()!.name,
          owner: set.data()!.owner,
          shared: set.data()!.shared,
        },
        sayings: setSayings,
      };

      resolve(currentSet);
    } else {
      // logout
    }
  });
}

function getSets() {
  return new Promise(async (resolve: (sets: Sets) => void, reject) => {
    const user = fireAuth.currentUser;

    if (user) {
      const setsRef = await db
        .collection("sets")
        .where("owner", "==", user.uid)
        .get();

      let sets = setsRef.docs.map(async (set) => {
        const owner = await db.collection("users").doc(set.data().owner).get();

        return {
          id: set.id,
          name: set.data().name,
          owner: owner.data()!.name,
          shared: set.data().shared,
        };
      });
      Promise.all(sets).then((values) => {
        resolve(values);
      });
    } else {
      // logout
    }
  });
}

function add(name: string, friends: string[]) {
  return new Promise((resolve: (user: any) => void, reject) => {
    const user = fireAuth.currentUser;

    if (user) {
      db.collection("sets")
        .add({ name: name, owner: user.uid, shared: friends })
        .then((setRef) => {
          resolve({
            id: setRef.id,
            name: name,
            owner: user?.displayName,
            shared: friends,
          });
        });
    } else {
      // logout
    }
  });
}
