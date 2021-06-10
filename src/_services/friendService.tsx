import { db } from "../_helpers/firebase";
import { fireAuth } from "../_helpers/firebase";
import { Friend, Request } from "../_helpers/types";

import firebase from "firebase/app";

export const friendService = {
  getFriends,
  getRequests,
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

function getRequests() {
  return new Promise(async (resolve: (requests: Request[]) => void, reject) => {
    const userId = localStorage.getItem("uid");

    if (userId !== null) {
      db.collection("requests")
        .where("to", "==", userId)
        .get()
        .then((requestsRef) => {
          const requestsPromise = requestsRef.docs.map(async (request) => {
            const requesterId = request.data().from;
            const requester = await db
              .collection("users")
              .doc(requesterId)
              .get();
            return {
              id: requesterId,
              name: requester.data()!.name,
              email: requester.data()!.email,
            };
          });
          Promise.all(requestsPromise).then((requests) => {
            resolve(requests);
          });
        });
    }
  });
}
