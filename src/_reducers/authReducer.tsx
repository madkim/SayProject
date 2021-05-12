import { Action } from "../_helpers/types";
import { authConstants } from "../_constants/authConstants";

export const initState: {
  isLoggedIn: boolean;
  loading: boolean;
} = {
  isLoggedIn: false,
  loading: false,
};

export function authReducer(state = initState, action: Action) {
  if (action.type === authConstants.USER_LOGIN_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      isLoggedIn: true,
    });
  }
  if (action.type === authConstants.USER_LOGIN_FAILURE) {
    return (state = {
      ...state,
      loading: false,
      isLoggedIn: false,
    });
  }

  return state;
}
