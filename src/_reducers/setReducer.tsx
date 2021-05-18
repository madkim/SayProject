import { Set, Sets } from "../_helpers/types";
import { Action } from "../_helpers/types";
import { setConstants } from "../_constants/setConstants";

export const initState: {
  sets: Sets;
  loading: boolean;
} = {
  sets: [],
  loading: false,
};

export function setReducer(state = initState, action: Action) {
  if (action.type === setConstants.GET_SETS_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }
  if (action.type === setConstants.GET_SETS_SUCCESS) {
    return (state = {
      ...state,
      loading: true,
      sets: action.payload,
    });
  }
  if (action.type === setConstants.GET_SETS_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  if (action.type === setConstants.ADD_NEW_SET_SUCCESS) {
    const newSet = action.payload;
    return (state = {
      ...state,
      loading: false,
      sets: [...state.sets, newSet],
    });
  }

  if (action.type === setConstants.ADD_NEW_SET_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  return state;
}
