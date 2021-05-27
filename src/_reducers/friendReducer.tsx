import { Action, Friend } from "../_helpers/types";
import { friendConstants } from "../_constants/friendConstants";

export const initState: {
  friends: Friend[];
  loading: boolean;
} = {
  friends: [],
  loading: false,
};

export function friendReducer(state = initState, action: Action) {
  if (action.type === friendConstants.GET_FRIENDS_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }

  if (action.type === friendConstants.GET_FRIENDS_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  if (action.type === friendConstants.GET_FRIENDS_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      friends: action.payload,
    });
  }

  return state;
}
