import { Action } from "../_helpers/types";
import { Dispatch } from "react";
import { authService } from "../_services/authService";
import { authConstants } from "../_constants/authConstants";

export const authActions = {
  logUserIn,
};

function logUserIn(username: string, password: string, history: any) {
  return (dispatch: Dispatch<Action>) => {
    authService
      .login(username, password)
      .then((user) => {
        console.log(user);
        dispatch({ type: authConstants.USER_LOGIN_SUCCESS, payload: true });
        history.push("/home");
      })
      .catch(() => {
        dispatch({
          type: authConstants.USER_LOGIN_FAILURE,
          payload: false,
        });
        alert(
          "An error occured while logging in. Please check your credentials and try again."
        );
      });
  };
}
