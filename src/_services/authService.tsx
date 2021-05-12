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
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  });
}
