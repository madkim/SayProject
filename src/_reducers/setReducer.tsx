import { setConstants } from "../_constants/setConstants";
import { Action, Sets, Set } from "../_helpers/types";

export const initState: {
  sets: Sets;
  loading: boolean;
  currentSet: Set;
} = {
  sets: [],
  loading: false,
  currentSet: { id: "", name: "", owner: "", count: 0, shared: [] },
};

export function setReducer(state = initState, action: Action) {
  if (action.type === setConstants.SET_INIT_STATE) {
    return (state = {
      ...state,
      loading: false,
      currentSet: { id: "", name: "", owner: "", count: 0, shared: [] },
    });
  }

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
