import { Action, Friend, Request } from "../_helpers/types";
import { friendConstants } from "../_constants/friendConstants";

export const initState: {
  friends: Friend[];
  requests: Request[];
  loading: boolean;
} = {
  friends: [],
  requests: [],
  loading: false,
};

export function friendReducer(state = initState, action: Action) {
  if (action.type === friendConstants.GET_FRIEND_REQUESTS_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      requests: action.payload,
    });
  }

  if (action.type === friendConstants.GET_FRIEND_REQUESTS_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

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
