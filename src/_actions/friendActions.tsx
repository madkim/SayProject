import { Action, Friend } from "../_helpers/types";
import { Dispatch } from "react";
import { friendService } from "../_services/friendService";
import { friendConstants } from "../_constants/friendConstants";

export const friendActions = {
  getFriends,
};

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
