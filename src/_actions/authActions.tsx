import { Action } from "../_helpers/types";
import { Dispatch } from "react";
import { authService } from "../_services/authService";
import { authConstants } from "../_constants/authConstants";

export const authActions = {
  logUserIn,
  logUserOut,
  signUserUp,
};

function signUserUp(
  fname: string,
  lname: string,
  email: string,
  password: string
) {
  console.log("signing up");
  // create user with email && password
  // then update user information
  // then create user in user table for fireStorage to
  // create the user's 'saying' collections
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: authConstants.USER_SIGNUP_REQUEST, payload: true });
    authService
      .signup(fname, lname, email, password)
      .then((user) => {
        console.log(user);
        dispatch({ type: authConstants.USER_SIGNUP_SUCCESS, payload: true });
      })
      .catch((error) => {
        dispatch({
          type: authConstants.USER_SIGNUP_FAILURE,
          payload: false,
        });
      });
  };
}

function logUserIn(email: string, password: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: authConstants.USER_LOGIN_REQUEST, payload: true });
    authService
      .login(email, password)
      .then((user) => {
        console.log(user);
        dispatch({ type: authConstants.USER_LOGIN_SUCCESS, payload: true });
      })
      .catch((error) => {
        dispatch({
          type: authConstants.USER_LOGIN_FAILURE,
          payload: false,
        });
      });
  };
}

function logUserOut() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: authConstants.USER_LOGOUT,
      payload: false,
    });
  };
}
