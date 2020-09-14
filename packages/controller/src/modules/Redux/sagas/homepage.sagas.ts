import { ActionTypes } from "../actions";
import { takeEvery, call, put, takeLeading } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";
import {
  clearHomepagePosts,
  getHomepagePostsCompletedAction,
  getHomepagePostsFailed,
  switchHomepageLoadingStae,
} from "../actions/homepage";

export function* watchGetHomepagePosts() {
  yield takeLeading(ActionTypes.GET_HOMEPAGE_POSTS, getHomepagePosts);
}

export function* watchClearHomepagePosts() {
  yield takeEvery(ActionTypes.CLEAR_HOMEPAGE_POSTS, clearHomepagePosts);
}

export function* getHomepagePosts(info: {
  type: string;
  payload: { order: string; time: string; page: number };
}) {
  try {
    yield put(switchHomepageLoadingStae());
    const homepageResponse = yield call(getHomepagePostsRequest, info.payload);

    yield put(getHomepagePostsCompletedAction(homepageResponse.body));
  } catch (error) {
    /*yield put(
      getHomepagePostsFailed({
        status: error.response.status,
        text: error.response.body.message,
      })
    ); */
    console.log(error);
  }
}

export const getHomepagePostsRequest = (info: {
  order: string;
  time: string;
  page: number;
}) => {
  const { order, time, page } = info;
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "/homepage/getPosts")
      .query({ order, time, page });
  } catch (error) {
    response = error.response;
  }

  return response;
};
