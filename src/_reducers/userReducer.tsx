import { userConstants } from "../_constants/userConstants";
import { Action } from "../_helpers/types";

export const initState: {
  user: object;
  loading: boolean;
} = {
  user: {},
  loading: false,
};

export function userReducer(state = initState, action: Action) {
  if (action.type === userConstants.GET_CURRENT_USER_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      user: action.payload,
    });
  }

  if (action.type === userConstants.GET_CURRENT_USER_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }

  if (action.type === userConstants.GET_CURRENT_USER_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  return state;
}
