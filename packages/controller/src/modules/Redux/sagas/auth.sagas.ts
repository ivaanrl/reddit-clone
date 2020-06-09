import { ActionTypes, BaseAction } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";

import {
  signinUserCompletedAction,
  signupUserCompletedAction,
  signupUserFailed,
  signinUserFailed,
} from "../actions/auth";

export function* watchUserSingin() {
  yield takeEvery(ActionTypes.SIGNIN_USER, signinUser);
}

export function* watchUserSignup() {
  yield takeEvery(ActionTypes.SIGNUP_USER, signupUser);
}

export function* signinUser(userInfo: {
  type: string;
  payload: {
    username: string;
    password: string;
  };
}) {
  try {
    const userResponse = yield call(signinRequest, userInfo.payload);

    yield put(signinUserCompletedAction(userResponse.body.user));
  } catch (error) {
    //Sign in failed
    yield put(
      signinUserFailed({
        error: {
          status: error.response.status,
          message: error.response.body.message,
        },
      })
    );
  }
}

export function* signupUser(userInfo: {
  type: string;
  payload: {
    username: string;
    password: string;
    email: string;
  };
}) {
  try {
    const userResponse = yield call(signupRequest, userInfo.payload);

    yield put(signupUserCompletedAction(userResponse.body.user));
  } catch (error) {
    //Signup failed
    yield put(
      signupUserFailed({
        error: {
          status: error.response.status,
          message: error.response.body.message,
        },
      })
    );
  }
}

export const signinRequest = (userInfo: {
  username: string;
  password: string;
}) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/auth/signin")
      .send(userInfo);
  } catch (error) {
    response = error.response;
  }
  return response;
};

export const signupRequest = (userInfo: {
  username: string;
  password: string;
  email: string;
}) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/auth/signup")
      .send(userInfo);
  } catch (error) {
    response = error.response;
  }
  return response;
};
