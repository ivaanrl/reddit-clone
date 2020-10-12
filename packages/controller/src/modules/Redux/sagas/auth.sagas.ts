import { ActionTypes } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import APIUrl from "../../../requestInfo";

import {
  signinUserCompletedAction,
  signupUserCompletedAction,
  signupUserFailed,
  signinUserFailed,
  signoutUserCompletedAction,
} from "../actions/auth";
import { authReducerState } from "../../../shared/types";
import { clearHomepagePosts, getHomepagePosts } from "../actions/homepage";

export function* watchUserSingin() {
  yield takeEvery(ActionTypes.SIGNIN_USER, signinUser);
}

export function* watchUserSignup() {
  yield takeEvery(ActionTypes.SIGNUP_USER, signupUser);
}

export function* watchUserSignout() {
  yield takeEvery(ActionTypes.SIGN_OUT_USER, signoutUser);
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
    yield put(clearHomepagePosts());
    yield put(getHomepagePosts('hot', 'all_time', 0));
    saveUserToLocalStorage(userResponse.body.user);
  } catch (error) {
    //Sign in failed
    yield put(
      signinUserFailed({
        message: {
          status: error.response.status,
          text: error.response.body.message,
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
    saveUserToLocalStorage(userResponse.body.user);
  } catch (error) {
    //Signup failed
    yield put(
      signupUserFailed({
        message: {
          status: error.response.status,
          text: error.response.body.message,
        },
      })
    );
  }
}

export function* signoutUser() {
  try {
    const response = yield call(signoutRequest);

    yield put(signoutUserCompletedAction());
  } catch (error) {
    //yield put(signoutUserCompletedAction());;
  }
}

export const signoutRequest = () => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "/auth/signout");
  } catch (error) {
    response = error.response;
  }
  return response;
};

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

export const saveUserToLocalStorage = (user: authReducerState) => {
  try {
    const serializeUser = JSON.stringify(user);
    localStorage.setItem("user", serializeUser);
  } catch (error) {
    //Should I ignore write errors?
  }
};
