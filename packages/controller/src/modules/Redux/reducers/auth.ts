import { BaseAction, ActionTypes } from "../actions";

export type authReducerState = {
  username: string;
  email: string;
  karma: number;
  userSubs: { id: number; name: string; adultContent: boolean }[];
  error?: {
    status: number | null;
    message: string;
  };
};

export const authReducer = (
  state: authReducerState = {
    username: "",
    email: "",
    karma: 0,
    userSubs: [],
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.SIGNIN_USER_COMPLETED:
      return {
        ...action.payload,
        error: {
          message: "",
          status: null,
        },
      };
    case ActionTypes.SIGNUP_USER_COMPLETED:
      return {
        ...action.payload,
        error: {
          message: "",
          status: null,
        },
      };
    case ActionTypes.SIGNUP_USER_FAILED:
      return { ...state, ...action.payload };
    case ActionTypes.SIGNIN_USER_FAILED:
      return { ...state, ...action.payload };
    case ActionTypes.SIGN_OUT_USER:
      return { ...action.payload };
    default:
      return state;
  }
};
