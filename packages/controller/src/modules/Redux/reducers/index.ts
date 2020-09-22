import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { subredditReducer } from "./subreddit";
import { fullPostReducer } from "./post";
import { profileReducer } from "./profile";
import { searchReducer } from "./search";
import { homePageReducer } from "./homepage";
import { notificationsReducer } from "./notifications";
import {
  authReducerState,
  fullPostState,
  homepageReducerState,
  notificationsReducerState,
  profileReducerState,
  searchReducerState,
  subredditState,
} from "../../../shared/types";

export interface State {
  auth: authReducerState;
  subreddit: subredditState;
  fullPost: fullPostState;
  profile: profileReducerState;
  search: searchReducerState;
  homepage: homepageReducerState;
  notifications: notificationsReducerState;
}

export const rootReducer = combineReducers<State>({
  auth: authReducer,
  subreddit: subredditReducer,
  fullPost: fullPostReducer,
  profile: profileReducer,
  search: searchReducer,
  homepage: homePageReducer,
  notifications: notificationsReducer,
});
