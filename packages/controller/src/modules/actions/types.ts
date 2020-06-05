export const ActionTypes = {
  GET_HOMEPAGE: "[0] GET HOMEPAGE POSTS FROM SERVER",
  SIGNIN_USER: "[1] START SIGNIN USER",
  SIGNIN_USER_COMPLETED: "[2] COMPLETE SIGNIN",
  SIGNUP_USER: "[3] SIGNUP USER",
  SIGNUP_USER_COMPLETED: "[4] COMPLETE SIGNUP USER",
};

export interface BaseAction {
  type: string;
  payload?: any;
}
