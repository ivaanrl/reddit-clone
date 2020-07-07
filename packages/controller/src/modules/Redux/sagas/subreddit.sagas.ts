import { ActionTypes, BaseAction } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";
import {
  getSubredditCompletedAction,
  getSubredditFailed,
  createSubredditCompletedAction,
  joinOrLeaveSubredditCompletedAction,
} from "../actions/subreddit";

export function* watchGetSubreddit() {
  yield takeEvery(ActionTypes.GET_SUBREDDIT, getSubreddit);
}

export function* watchCreateSubreddit() {
  yield takeEvery(ActionTypes.CREATE_SUBREDDIT, createSubreddit);
}

export function* watchJoinOrLeaveSubreddit() {
  yield takeEvery(ActionTypes.JOIN_LEAVE_SUBREDDIT, joinOrLeaveSubreddit);
}

export function* getSubreddit(subInfo: { type: string; payload: string }) {
  try {
    const subResponse = yield call(getSubredditRequest, subInfo.payload);

    yield put(getSubredditCompletedAction(subResponse.body));
  } catch (error) {
    //failed to get sub
    yield put(
      getSubredditFailed({
        status: error.status,
        text: error.response.body.message,
      })
    );
  }
}

export function* joinOrLeaveSubreddit(info: { type: string; payload: string }) {
  try {
    const res = yield call(joinOrLeaveRequest, info.payload);

    yield put(joinOrLeaveSubredditCompletedAction(res.body.userJoined));
  } catch (error) {
    //handle error
  }
}

export const joinOrLeaveRequest = (subName: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/subreddit/joinOrLeave")
      .send({ subName });
  } catch (error) {
    response = error.response;
  }

  return response;
};

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

export function* createSubreddit(subInfo: {
  type: string;
  payload: {
    name: string;
    communityTopics: string[];
    description: string;
    adultContent: boolean;
  };
}) {
  try {
    const subResponse = yield call(createSubredditRequest, subInfo.payload);

    yield put(createSubredditCompletedAction(subResponse));
  } catch (error) {
    console.log("NEED TO HANDLE ERROR!");
  }
}

export const createSubredditRequest = async (subInfo: {
  name: string;
  communityTopics: string[];
  description: string;
  adultContent: boolean;
}) => {
  let response: superagent.Response;
  try {
    response = await superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/subreddit/createSubreddit")
      .send(subInfo);
  } catch (error) {
    response = error.response;
  }
  return response;
};
