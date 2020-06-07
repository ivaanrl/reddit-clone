import { BaseAction, ActionTypes } from "../actions";

export type authReducerState = {
  userid: string;
  username: string;
  email: string;
  karma: number;
  error?: {
    status: string;
    message: string;
  };
};

export const authReducer = (
  state: authReducerState = {
    userid: "",
    username: "",
    email: "",
    karma: 0,
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.SIGNIN_USER_COMPLETED:
      return action.payload;
    case ActionTypes.SIGNUP_USER_COMPLETED:
      return action.payload;
    case ActionTypes.SIGNUP_USER_FAILED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
