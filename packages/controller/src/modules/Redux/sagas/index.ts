import { all, fork } from "redux-saga/effects";
import { watchUserSingin, watchUserSignup } from "./auth.sagas";

export const rootSaga = function* root() {
  yield all([fork(watchUserSignup), fork(watchUserSingin)]);
};
