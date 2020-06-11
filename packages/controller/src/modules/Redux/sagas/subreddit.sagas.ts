import { ActionTypes, BaseAction } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";
import {
  getSubredditCompletedAction,
  getSubredditFailed,
} from "../actions/subreddit";

export function* watchGetSubreddit() {
  yield takeEvery(ActionTypes.GET_SUBREDDIT, getSubreddit);
}

export function* getSubreddit(subInfo: { type: string; payload: string }) {
  try {
    const subResponse = yield call(getSubredditRequest, subInfo.payload);

    yield put(getSubredditCompletedAction(subResponse.body));
  } catch (error) {
    //failed to get sub
    yield put(getSubredditFailed(error.status));
  }
}

export const getSubredditRequest = (subName: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "/subreddit/getSubreddit/" + subName);
  } catch (error) {
    response = error.response;
  }
  return response;
};
