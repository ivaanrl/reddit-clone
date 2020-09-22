import { authReducerState } from "../../../shared/types/auth";
import { BaseAction, ActionTypes } from "../actions";

export const authReducer = (
  state: authReducerState = {
    username: "",
    email: "",
    karma: 0,
    userSubs: [],
    unreadNotifications: 0,
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
