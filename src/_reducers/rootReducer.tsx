import { setReducer } from "./setReducer";
import { authReducer } from "./authReducer";
import { sayingReducer } from "./sayingReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  set: setReducer,
  auth: authReducer,
  saying: sayingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
