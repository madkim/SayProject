import { authReducer } from "./authReducer";
import { setReducer } from "./setReducer";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  auth: authReducer,
  set: setReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
