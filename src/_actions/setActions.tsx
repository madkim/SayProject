import { Dispatch } from "react";
import { setService } from "../_services/setService";
import { setConstants } from "../_constants/setConstants";
import { Action, Set, Sets } from "../_helpers/types";

export const setActions = {
  addSet,
  getSetById,
  getAllSets,
};

function getSetById(id: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: setConstants.GET_SET_REQUEST, payload: true });
    setService
      .getSet(id)
      .then((set: Set) => {
        dispatch({ type: setConstants.GET_SET_SUCCESS, payload: set });
      })
      .catch((error) => {
        dispatch({
          type: setConstants.GET_SET_FAILURE,
          payload: false,
        });
      });
  };
}

function getAllSets() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: setConstants.GET_SETS_REQUEST, payload: true });
    setService
      .getSets()
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
