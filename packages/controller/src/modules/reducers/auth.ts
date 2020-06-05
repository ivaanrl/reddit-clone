import { BaseAction, ActionTypes } from "../actions";

export type authReducerState = {
  userid: string;
  username: string;
  karma: number;
};

export const authReducer = (
  state: authReducerState = {
    userid: "",
    username: "",
    karma: 0,
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.SIGNIN_USER_COMPLETED:
      return action.payload;
    case ActionTypes.SIGNUP_USER_COMPLETED:
      return action.payload;
    default:
      return state;
  }
};
