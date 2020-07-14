import { ActionTypes } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";
import {
  getHomepagePostsCompletedAction,
  getHomepagePostsFailed,
} from "../actions/homepage";

export function* watchGetHomepagePosts() {
  yield takeEvery(ActionTypes.GET_HOMEPAGE_POSTS, getHomepagePosts);
}

export function* getHomepagePosts(_info: { type: string }) {
  try {
    const homepageResponse = yield call(getHomepagePostsRequest);

    yield put(getHomepagePostsCompletedAction(homepageResponse.body));
  } catch (error) {
    yield put(
      getHomepagePostsFailed({
        status: error.response.status,
        text: error.response.body.message,
      })
    );
  }
}

export const getHomepagePostsRequest = () => {
  let response;

  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "/homepage/getPosts");
  } catch (error) {
    response = error.response;
  }

  return response;
};
