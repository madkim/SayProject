import { Dispatch } from "react";
import { setService } from "../_services/setService";
import { setConstants } from "../_constants/setConstants";
import { Action, Set, Sets } from "../_helpers/types";

export const setActions = {
  addSet,
  getSets,
};

function getSets() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: setConstants.GET_SETS_REQUEST, payload: true });
    setService
      .get()
      .then((sets: Sets) => {
        dispatch({ type: setConstants.GET_SETS_SUCCESS, payload: sets });
      })
      .catch((error) => {
        dispatch({
          type: setConstants.GET_SETS_FAILURE,
          payload: false,
        });
      });
  };
}

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
