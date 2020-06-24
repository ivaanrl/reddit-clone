import { combineReducers } from "redux";
import { authReducer, authReducerState } from "./auth";
import { subredditState, subredditReducer } from "./subreddit";
import { fullPostState, fullPostReducer } from "./post";

export interface State {
  auth: authReducerState;
  subreddit: subredditState;
  fullPost: fullPostState;
}

export const rootReducer = combineReducers<State>({
  auth: authReducer,
  subreddit: subredditReducer,
  fullPost: fullPostReducer,
});
