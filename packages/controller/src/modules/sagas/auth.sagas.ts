import { ActionTypes, BaseAction } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
//import request from "superagent";
import { signinUserCompletedAction } from "../actions/auth";

export function* watchUserSingin() {
  yield takeEvery(ActionTypes.SIGNIN_USER, signinUser);
}

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
}
