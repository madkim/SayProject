import { fireAuth } from "../_helpers/firebase";

export const authService = {
  login,
};

function login(username: string, password: string) {
  return new Promise((resolve: (user: any) => void) => {
    fireAuth
      .signInWithEmailAndPassword(username, password)
      .then((userCredential: any) => {
        // Signed in
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error: any) => {
        console.log(error.code);
        console.log(error.message);
      });
  });
}
