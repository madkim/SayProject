import { Action } from "../_helpers/types";
import { setConstants } from "../_constants/setConstants";
import { CurrentSet, Sets } from "../_helpers/types";

export const initState: {
  sets: Sets;
  loading: boolean;
  currentSet: CurrentSet;
} = {
  sets: [],
  loading: false,
  currentSet: { set: { id: "", name: "", owner: "", shared: [] }, sayings: [] },
};

export function setReducer(state = initState, action: Action) {
  if (action.type === setConstants.GET_SET_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }

  if (action.type === setConstants.GET_SET_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      currentSet: action.payload,
    });
  }

  if (action.type === setConstants.GET_SET_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  if (action.type === setConstants.GET_SETS_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }

  if (action.type === setConstants.GET_SETS_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      sets: action.payload,
    });
  }

  if (action.type === setConstants.GET_SETS_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  if (action.type === setConstants.ADD_NEW_SET_REQUEST) {
    return (state = {
      ...state,
      loading: true,
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
