import { setReducer } from "./setReducer";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { sayingReducer } from "./sayingReducer";
import { friendReducer } from "./friendReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  set: setReducer,
  auth: authReducer,
  user: userReducer,
  saying: sayingReducer,
  friends: friendReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
