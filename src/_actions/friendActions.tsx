import { Action, Friend, Request } from "../_helpers/types";
import { Dispatch } from "react";
import { friendService } from "../_services/friendService";
import { friendConstants } from "../_constants/friendConstants";

export const friendActions = {
  getFriends,
  getFriendRequests,
};

function getFriendRequests() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: friendConstants.GET_FRIENDS_REQUEST,
      payload: true,
    });
    friendService
      .getRequests()
      .then((requests: Request[]) => {
        dispatch({
          type: friendConstants.GET_FRIEND_REQUESTS_SUCCESS,
          payload: requests,
        });
      })
      .catch((error) => {
        dispatch({
          type: friendConstants.GET_FRIEND_REQUESTS_FAILURE,
          payload: false,
        });
      });
  };
}

function getFriends() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: friendConstants.GET_FRIENDS_REQUEST,
      payload: true,
    });
    friendService
      .getFriends()
      .then((friends: Friend[]) => {
        Promise.all(friends).then((values) => {
          dispatch({
            type: friendConstants.GET_FRIENDS_SUCCESS,
            payload: values,
          });
        });
      })
      .catch((error) => {
        dispatch({
          type: friendConstants.GET_FRIENDS_FAILURE,
          payload: false,
        });
      });
  };
}
