import { combineReducers } from "redux";
import { authReducer, authReducerState } from "./auth";
import { subredditState, subredditReducer } from "./subreddit";

export interface State {
  auth: authReducerState;
  subreddit: subredditState;
}

export const rootReducer = combineReducers<State>({
  auth: authReducer,
  subreddit: subredditReducer,
});
