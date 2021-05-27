import { db } from "../_helpers/firebase";
import { Friend } from "../_helpers/types";
import { fireAuth } from "../_helpers/firebase";

import firebase from "firebase/app";

export const friendService = {
  getFriends,
};

function getFriends() {
  return new Promise(async (resolve: (friends: Friend[]) => void, reject) => {
    const userId = localStorage.getItem("uid");

    if (userId !== null) {
      const user = await db.collection("users").doc(userId).get();

      if (user.data()?.friends) {
        const friends = user.data()!.friends.map(async (friendRef: any) => {
          const friend = await friendRef.get();
          return friend.data();
        });
        resolve(friends);
      }
      resolve([]);
    }
  });
}
