import { db } from "../_helpers/firebase";
import { fireAuth } from "../_helpers/firebase";
import { Friend, Request } from "../_helpers/types";

import firebase from "firebase/app";

export const friendService = {
  getSearch,
  getFriends,
  getRequests,
};

function getSearch(searchText: string) {
  return new Promise(async (resolve: (searchResults: any) => void, reject) => {
    db.collection("users")
      .get()
      .then((usersRef) => {
        if (searchText) {
          const searchResults = usersRef.docs.map((user) => {
            if (
              user
                .data()
                .name.toLowerCase()
                .trim()
                .includes(searchText.toLowerCase().trim())
            ) {
              return { id: user.id, ...user.data() };
            }
          });
          resolve(searchResults);
        }
        resolve([]);
      });
  });
}

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
