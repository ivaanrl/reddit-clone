import { ActionTypes } from "./types";

export const signinUser = (user: any) => ({
  type: ActionTypes.SIGNIN_USER,
  payload: user,
});

export const signinUserCompletedAction = (user: any) => ({
  type: ActionTypes.SIGNIN_USER,
  payload: user,
});

export const signipUserFailed = (error: {
  status: number;
  message: string;
}) => ({
  type: ActionTypes.SIGNIN_USER_FAILED,
  payload: error,
});

export const signupUser = (user: any) => ({
  type: ActionTypes.SIGNUP_USER,
  payload: user,
});

export const signupUserCompletedAction = (user: any) => ({
  type: ActionTypes.SIGNUP_USER_COMPLETED,
  payload: user,
});

export const signupUserFailed = (error: {
  [error: string]: {
    status: string;
    message: string;
  };
}) => ({
  type: ActionTypes.SIGNUP_USER_FAILED,
  payload: error,
});
