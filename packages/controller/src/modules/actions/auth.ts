import { ActionTypes } from "./types";

export const signinUser = (user: any) => ({
  type: ActionTypes.SIGNIN_USER,
  payload: user,
});

export const signinUserCompletedAction = (user: any) => ({
  type: ActionTypes.SIGNIN_USER,
  payload: user,
});

export const signupUser = (user: any) => ({
  type: ActionTypes.SIGNIN_USER,
  payload: user,
});

export const signupUserCompletedAction = (user: any) => ({
  type: ActionTypes.SIGNUP_USER,
  payload: user,
});
