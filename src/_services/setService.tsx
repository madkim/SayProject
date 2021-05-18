import { fireAuth } from "../_helpers/firebase";
import { db } from "../_helpers/firebase";

export const setService = {
  add,
};

function add(name: string, friends: string[]) {
  return new Promise((resolve: (user: any) => void, reject) => {
    var user = fireAuth.currentUser;

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
