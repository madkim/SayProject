import { Action, Saying } from "../_helpers/types";
import { Dispatch } from "react";
import { sayingService } from "../_services/sayingService";
import { sayingConstants } from "../_constants/sayingConstants";

export const sayingActions = {
  addNewSaying,
  getAllSayings,
  getSayingById,
  deleteSayingById,
  getSayingsBySetId,
  saveSayingRecording,
};

function saveSayingRecording(
  recording: string,
  sayingId: string,
  setId: string
) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: sayingConstants.SAVE_RECORDING_REQUEST, payload: true });
    sayingService
      .saveRecording(recording, sayingId, setId)
      .then(() => {
        dispatch({
          type: sayingConstants.SAVE_RECORDING_SUCCESS,
          payload: sayingId,
        });
      })
      .catch((error) => {
        dispatch({
          type: sayingConstants.SAVE_RECORDING_FAILURE,
          payload: false,
        });
      });
  };
}

function addNewSaying(saying: string, setId: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: sayingConstants.GET_SAYING_REQUEST, payload: true });
    sayingService
      .addSaying(saying, setId)
      .then((saying: Saying) => {
        dispatch({
          type: sayingConstants.ADD_SAYING_SUCCESS,
          payload: saying,
        });
      })
      .catch((error) => {
        dispatch({
          type: sayingConstants.ADD_SAYING_FAILURE,
          payload: false,
        });
      });
  };
}

function getAllSayings() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: sayingConstants.GET_SAYING_REQUEST, payload: true });
    sayingService
      .getAll()
      .then((sayings: Saying[]) => {
        dispatch({
          type: sayingConstants.GET_ALL_SAYINGS_SUCCESS,
          payload: sayings,
        });
      })
      .catch((error) => {
        dispatch({
          type: sayingConstants.GET_ALL_SAYINGS_FAILURE,
          payload: false,
        });
      });
  };
}

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

function deleteSayingById(
  sayingId: string,
  setId: string,
  hasRecording: boolean
) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: sayingConstants.DELETE_SAYING_REQUEST, payload: true });
    sayingService
      .deleteSaying(sayingId, setId, hasRecording)
      .then(() => {
        dispatch({
          type: sayingConstants.DELETE_SAYING_SUCCESS,
          payload: sayingId,
        });
      })
      .catch((error) => {
        dispatch({
          type: sayingConstants.DELETE_SAYING_FAILURE,
          payload: false,
        });
      });
  };
}
