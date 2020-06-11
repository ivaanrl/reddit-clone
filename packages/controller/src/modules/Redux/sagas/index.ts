import { all, fork } from "redux-saga/effects";
import {
  watchUserSingin,
  watchUserSignup,
  watchUserSignout,
} from "./auth.sagas";
import { watchGetSubreddit } from "./subreddit.sagas";

export const rootSaga = function* root() {
  yield all([
    fork(watchUserSignup),
    fork(watchUserSingin),
    fork(watchUserSignout),
    fork(watchGetSubreddit),
  ]);
};
