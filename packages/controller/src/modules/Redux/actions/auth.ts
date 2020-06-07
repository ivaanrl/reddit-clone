import { ActionTypes } from "./types";
import { stringify } from "querystring";

export const signinUser = (user: { username: string; password: string }) => ({
  type: ActionTypes.SIGNIN_USER,
  payload: user,
});

export const signinUserCompletedAction = (user: {
  email: string;
  karma: number;
  username: string;
}) => ({
  type: ActionTypes.SIGNIN_USER_COMPLETED,
  payload: user,
});

export const signinUserFailed = (error: {
  [error: string]: {
    status: number;
    message: string;
  };
}) => ({
  type: ActionTypes.SIGNIN_USER_FAILED,
  payload: error,
});

export const signupUser = (user: {
  email: string;
  password: string;
  username: string;
}) => ({
  type: ActionTypes.SIGNUP_USER,
  payload: user,
});

export const signupUserCompletedAction = (user: {
  email: string;
  karma: number;
  username: string;
}) => ({
  type: ActionTypes.SIGNUP_USER_COMPLETED,
  payload: user,
});

export const signupUserFailed = (error: {
  [error: string]: {
    status: number;
    message: string;
  };
}) => ({
  type: ActionTypes.SIGNUP_USER_FAILED,
  payload: error,
});

export const signoutUser = () => ({
  type: ActionTypes.SIGN_OUT_USER,
  payload: {
    email: "",
    username: "",
    karma: 0,
    error: {
      status: null,
      message: "",
    },
  },
});
