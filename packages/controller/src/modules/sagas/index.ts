import { all, fork } from "redux-saga/effects";
import { watchUserSingin } from "./auth.sagas";

export const rootSaga = function* root() {
  yield all([fork(watchUserSingin)]);
};
