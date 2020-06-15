import { all, fork } from "redux-saga/effects";
import {
  watchUserSingin,
  watchUserSignup,
  watchUserSignout,
} from "./auth.sagas";
import { watchCreatePost } from "./post.sagas";
import { watchGetSubreddit, watchCreateSubreddit } from "./subreddit.sagas";

export const rootSaga = function* root() {
  yield all([
    fork(watchUserSignup),
    fork(watchUserSingin),
    fork(watchUserSignout),
    fork(watchGetSubreddit),
    fork(watchCreatePost),
    fork(watchCreateSubreddit),
  ]);
};
