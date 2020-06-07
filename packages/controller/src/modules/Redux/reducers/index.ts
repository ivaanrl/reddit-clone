import { combineReducers } from "redux";
import { authReducer, authReducerState } from "./auth";

export interface State {
  auth: authReducerState;
}

export const rootReducer = combineReducers<State>({
  auth: authReducer,
});
