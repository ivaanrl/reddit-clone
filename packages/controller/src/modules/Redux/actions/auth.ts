import { ActionTypes } from "./types";

export const signinUser = (user: { username: string; password: string }) => ({
  type: ActionTypes.SIGNIN_USER,
  payload: user,
});

export const signinUserCompletedAction = (user: {
  email: string;
  karma: number;
  username: string;
  userSubs: {
    name: string;
    adultContent: boolean;
  }[];
}) => ({
  type: ActionTypes.SIGNIN_USER_COMPLETED,
  payload: user,
});

export const signinUserFailed = (message: {
  [message: string]: {
    status: number;
    text: string;
  };
}) => ({
  type: ActionTypes.SIGNIN_USER_FAILED,
  payload: message,
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

export const signupUserFailed = (message: {
  [message: string]: {
    status: number;
    text: string;
  };
}) => ({
  type: ActionTypes.SIGNUP_USER_FAILED,
  payload: message,
});

export const signoutUser = () => ({
  type: ActionTypes.SIGN_OUT_USER,
});

export const signoutUserCompletedAction = () => ({
  type: ActionTypes.SIGN_OUT_USER_COMPLETED,
  payload: {
    email: "",
    username: "",
    karma: 0,
    userSubs: [],
    message: {
      status: 0,
      text: "",
    },
  },
});

export const removeAuthErrors = () => ({
  type: ActionTypes.REMOVE_AUTH_ERRORS,
});
