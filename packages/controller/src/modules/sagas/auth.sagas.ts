import { ActionTypes, BaseAction } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../requestInfo";

import {
  signinUserCompletedAction,
  signupUserCompletedAction,
  signupUserFailed,
} from "../actions/auth";

/*
export function* watchUserSingin() {
  yield takeEvery(ActionTypes.SIGNIN_USER, signinUser);
}*/

export function* watchUserSignup() {
  yield takeEvery(ActionTypes.SIGNUP_USER, signupUser);
}
/*
function* signinUser(userInfo: {
  type: string;
  payload: {
    username: string;
    password: string;
  };
}) {
  console.log("signin userinnfo", userInfo);
  try {
    const user = yield fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        username: userInfo.payload.username,
        password: userInfo.payload.password,
      }),
    });

    yield put(signinUserCompletedAction(user));
  } catch (error) {
    console.log(error);
  }
} */

function* signupUser(userInfo: {
  type: string;
  payload: {
    username: string;
    password: string;
    email: string;
  };
}) {
  try {
    const userResponse = yield call(() =>
      superagent.post(APIUrl + "/auth/signup").send(userInfo.payload)
    );

    yield put(signupUserCompletedAction(userResponse.body.user));
  } catch (error) {
    //Signup failed
    console.log(error);
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
