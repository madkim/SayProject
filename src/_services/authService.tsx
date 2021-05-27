import { db } from "../_helpers/firebase";
import { fireAuth } from "../_helpers/firebase";

export const authService = {
  login,
  signup,
};

function signup(fname: string, lname: string, email: string, password: string) {
  return new Promise((resolve: (user: any) => void, reject) => {
    fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential: any) => {
        const name = `${fname} ${lname}`;

        await userCredential.user.updateProfile({
          displayName: name,
        });

        await db.collection("users").doc(userCredential.user.uid).set({
          name: name,
          email: email,
        });

        resolve(userCredential.user);
      })
      .catch((error: any) => {
        console.log(error.code);
        console.log(error.message);
        reject(error.code);
      });
  });
}

function login(email: string, password: string) {
  return new Promise((resolve: (user: any) => void, reject) => {
    fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential: any) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("dispalyName", user.displayName);

        resolve(user);
      })
      .catch((error: any) => {
        console.log(error.code);
        console.log(error.message);
        reject(error.code);
      });
  });
}
