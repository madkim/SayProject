import { Action } from "../_helpers/types";
import { Dispatch } from "react";
import { userService } from "../_services/userService";
import { userConstants } from "../_constants/userConstants";

export const userActions = {
  getCurrentUser,
  findUserByEmail,
};

function getCurrentUser() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: userConstants.GET_CURRENT_USER_REQUEST, payload: true });
    userService
      .getUser()
      .then((user) => {
        dispatch({
          type: userConstants.GET_CURRENT_USER_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        dispatch({
          type: userConstants.GET_CURRENT_USER_FAILURE,
          payload: false,
        });
      });
  };
}

function findUserByEmail(email: string, history: any) {
  return (dispatch: Dispatch<Action>) => {};
}
