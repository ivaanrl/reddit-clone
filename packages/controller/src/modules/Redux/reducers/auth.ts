import { BaseAction, ActionTypes } from "../actions";

export type authReducerState = {
  username: string;
  email: string;
  karma: number;
  userSubs: { name: string; adultContent: boolean }[];
  message: {
    status: number;
    text: string;
  };
};

export const authReducer = (
  state: authReducerState = {
    username: "",
    email: "",
    karma: 0,
    userSubs: [],
    message: {
      status: 0,
      text: "",
    },
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.SIGNIN_USER_COMPLETED:
      return {
        ...action.payload,
        message: {
          text: "",
          status: 0,
        },
      };
    case ActionTypes.SIGNUP_USER_COMPLETED:
      return {
        ...action.payload,
        message: {
          text: "",
          status: 0,
        },
      };
    case ActionTypes.SIGNUP_USER_FAILED:
      return { ...state, ...action.payload };
    case ActionTypes.SIGNIN_USER_FAILED:
      return { ...state, ...action.payload };
    case ActionTypes.SIGN_OUT_USER:
      return { ...action.payload };
    case ActionTypes.REMOVE_AUTH_ERRORS:
      return {
        ...state,
        message: {
          text: "",
          status: 0,
        },
      };
    default:
      return state;
  }
};
