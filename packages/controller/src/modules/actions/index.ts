import {
  signinUser,
  signupUser,
  signinUserCompletedAction,
  signupUserCompletedAction,
  signipUserFailed,
  signupUserFailed,
} from "./auth";

export const allActions = {
  signinUser,
  signupUser,
  signinUserCompletedAction,
  signupUserCompletedAction,
  signipUserFailed,
  signupUserFailed,
};

export * from "./types";
