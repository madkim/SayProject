import { Action } from "../_helpers/types";
import { authConstants } from "../_constants/authConstants";

export const initState: {
  loading: boolean;
  isLoggedIn: boolean;
  loginFailed: boolean;
} = {
  loading: false,
  isLoggedIn: false,
  loginFailed: false,
};

export function authReducer(state = initState, action: Action) {
  if (action.type === authConstants.USER_LOGIN_REQUEST) {
    return (state = {
      ...state,
      loading: true,
      loginFailed: false,
    });
  }
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
      loginFailed: true,
    });
  }

  return state;
}
