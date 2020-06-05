import { BaseAction, ActionTypes } from "../actions";

export type authReducerState = {};

export const authReducer = (
  state: authReducerState = {},
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
