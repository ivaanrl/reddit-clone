import {
  signinUser,
  signupUser,
  signinUserCompletedAction,
  signupUserCompletedAction,
  signinUserFailed,
  signupUserFailed,
  signoutUser,
} from "./auth";

import {
  getSubreddit,
  getSubredditCompletedAction,
  getSubredditFailed,
} from "./subreddit";

export const allActions = {
  signinUser,
  signupUser,
  signinUserCompletedAction,
  signupUserCompletedAction,
  signinUserFailed,
  signupUserFailed,
  signoutUser,
  getSubreddit,
  getSubredditCompletedAction,
  getSubredditFailed,
};

export * from "./types";
