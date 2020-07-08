import { combineReducers } from "redux";
import { authReducer, authReducerState } from "./auth";
import { subredditState, subredditReducer } from "./subreddit";
import { fullPostState, fullPostReducer } from "./post";
import { profileReducerState, profileReducer } from "./profile";

export interface State {
  auth: authReducerState;
  subreddit: subredditState;
  fullPost: fullPostState;
  profile: profileReducerState;
}

export const rootReducer = combineReducers<State>({
  auth: authReducer,
  subreddit: subredditReducer,
  fullPost: fullPostReducer,
  profile: profileReducer,
});
