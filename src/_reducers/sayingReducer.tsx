import { Action, Saying } from "../_helpers/types";
import { sayingConstants } from "../_constants/sayingConstants";

export const initState: {
  saying: Saying;
  loading: boolean;
  sayings: Saying[];
  allSayings: Saying[];
} = {
  saying: {
    id: "",
    set: "",
    owner: "",
    saying: "",
    setName: "",
    createdAt: "",
    recording: "",
    hasRecording: false,
  },
  sayings: [],
  allSayings: [],
  loading: false,
};

export function sayingReducer(state = initState, action: Action) {
  if (action.type === sayingConstants.SET_INIT_STATE) {
    return (state = {
      ...state,
      loading: false,
      sayings: [],
    });
  }

  if (action.type === sayingConstants.GET_ALL_SAYINGS_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      allSayings: action.payload,
    });
  }

  if (action.type === sayingConstants.GET_ALL_SAYINGS_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  if (action.type === sayingConstants.DELETE_RECORDING_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      sayings: state.sayings.map((saying) => {
        if (saying.id === action.payload) {
          saying.hasRecording = false;
          saying.recording = "";
        }
        return saying;
      }),
    });
  }

  if (action.type === sayingConstants.SAVE_RECORDING_SUCCESS) {
    return (state = {
      ...state,
      loading: false,
      sayings: state.sayings.map((saying) => {
        if (saying.id === action.payload) {
          saying.hasRecording = true;
        }
        return saying;
      }),
    });
  }

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
