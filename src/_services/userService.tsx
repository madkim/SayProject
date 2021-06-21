import { db } from "../_helpers/firebase";

export const userService = {
  getUser,
};

function getUser() {
  return new Promise(async (resolve: (user: any) => void, reject) => {
    const userId = localStorage.getItem("uid");

    if (userId) {
      const user = await db.collection("users").doc(userId).get();

      if ("friends" in user.data()!) {
        const friendsPromise = user
          .data()!
          .friends.map(async (friendRef: any) => {
            const friend = await friendRef.get();
            return friend.id;
          });
        Promise.all(friendsPromise).then((friends) => {
          resolve({ id: userId, friends: friends });
        });
      } else {
        resolve({ id: userId, ...user.data() });
      }
    } else {
      // logout
    }
  });
}
