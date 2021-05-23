import { db } from "../_helpers/firebase";
import { Set, Sets } from "../_helpers/types";

export const setService = {
  add,
  getSet,
  getSets,
};

function getSet(id: string) {
  return new Promise(async (resolve: (set: Set) => void, reject) => {
    const userId = localStorage.getItem("uid");

    if (userId) {
      const set = await db.collection("sets").doc(id).get();

      resolve({
        id: id,
        name: set.data()!.name,
        owner: set.data()!.owner,
        shared: set.data()!.shared,
      });
    } else {
      // logout
    }
  });
}

function getSets() {
  return new Promise(async (resolve: (sets: Sets) => void, reject) => {
    const userId = localStorage.getItem("uid");

    if (userId !== null) {
      const setsRef = await db
        .collection("sets")
        .where("owner", "==", userId)
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
    const userId = localStorage.getItem("uid");
    const displayName = localStorage.getItem("displayName");

    if (userId !== null) {
      db.collection("sets")
        .add({ name: name, owner: userId, shared: friends })
        .then((setRef) => {
          resolve({
            id: setRef.id,
            name: name,
            owner: displayName,
            shared: friends,
          });
        });
    } else {
      // logout
    }
  });
}
