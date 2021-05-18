import { Action, Saying } from "../_helpers/types";
import { Dispatch } from "react";
import { sayingService } from "../_services/sayingService";
import { sayingConstants } from "../_constants/sayingConstants";

export const sayingActions = {
  getSayingById,
  deleteSayingById,
  getSayingsBySetId,
};

function getSayingById(id: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: sayingConstants.GET_SAYING_REQUEST, payload: true });
    sayingService
      .getSaying(id)
      .then((saying: Saying) => {
        dispatch({
          type: sayingConstants.GET_SAYING_SUCCESS,
          payload: saying,
        });
      })
      .catch((error) => {
        dispatch({
          type: sayingConstants.GET_SAYING_FAILURE,
          payload: false,
        });
      });
  };
}

function getSayingsBySetId(id: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: sayingConstants.GET_SAYINGS_REQUEST, payload: true });
    sayingService
      .getSayings(id)
      .then((sayings: Saying[]) => {
        dispatch({
          type: sayingConstants.GET_SAYINGS_SUCCESS,
          payload: sayings,
        });
      })
      .catch((error) => {
        dispatch({
          type: sayingConstants.GET_SAYINGS_FAILURE,
          payload: false,
        });
      });
  };
}

function deleteSayingById(id: string, history: any, path: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: sayingConstants.DELETE_SAYING_REQUEST, payload: true });
    sayingService
      .deleteSaying(id)
      .then(() => {
        dispatch({
          type: sayingConstants.DELETE_SAYING_SUCCESS,
          payload: id,
        });
        history.push(path);
      })
      .catch((error) => {
        dispatch({
          type: sayingConstants.DELETE_SAYING_FAILURE,
          payload: false,
        });
      });
  };
}
