import { Action, Saying } from "../_helpers/types";
import { sayingConstants } from "../_constants/sayingConstants";

export const initState: {
  saying: Saying;
  sayings: Saying[];
  loading: boolean;
} = {
  saying: {
    id: "",
    set: "",
    owner: "",
    saying: "",
    createdAt: "",
    recording: "",
    hasRecording: false,
  },
  sayings: [],
  loading: false,
};

export function sayingReducer(state = initState, action: Action) {
  if (action.type === sayingConstants.ADD_SAYING_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      sayings: [action.payload, ...state.sayings],
    });
  }

  if (action.type === sayingConstants.ADD_SAYING_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  if (action.type === sayingConstants.GET_SAYING_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }

  if (action.type === sayingConstants.GET_SAYING_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      saying: action.payload,
    });
  }

  if (action.type === sayingConstants.GET_SAYING_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  if (action.type === sayingConstants.GET_SAYINGS_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }

  if (action.type === sayingConstants.GET_SAYINGS_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      sayings: action.payload,
    });
  }

  if (action.type === sayingConstants.GET_SAYINGS_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  if (action.type === sayingConstants.DELETE_SAYING_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }

  if (action.type === sayingConstants.DELETE_SAYING_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      sayings: state.sayings.filter((saying) => {
        return saying.id !== action.payload;
      }),
    });
  }

  if (action.type === sayingConstants.DELETE_SAYING_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  return state;
}
