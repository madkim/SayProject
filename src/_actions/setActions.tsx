import { Dispatch } from "react";
import { setService } from "../_services/setService";
import { Action, Set } from "../_helpers/types";
import { setConstants } from "../_constants/setConstants";

export const setActions = {
  addSet,
};

function addSet(name: string, friends: string[], history: any) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: setConstants.ADD_NEW_SET_REQUEST, payload: true });
    setService
      .add(name, friends)
      .then((set: Set) => {
        dispatch({ type: setConstants.ADD_NEW_SET_SUCCESS, payload: set });
        history.push("/sets");
      })
      .catch((error) => {
        dispatch({
          type: setConstants.ADD_NEW_SET_FAILURE,
          payload: false,
        });
      });
  };
}
