import { db } from "../_helpers/firebase";
import { Sets } from "../_helpers/types";
import { fireAuth } from "../_helpers/firebase";

export const setService = {
  add,
  get,
};

function get() {
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
