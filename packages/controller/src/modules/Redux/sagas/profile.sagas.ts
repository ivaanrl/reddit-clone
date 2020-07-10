import { ActionTypes, BaseAction } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";
import {
  getProfileCompletedAction,
  getProfileFailed,
  getProfileCommentsCompletedAction,
  getProfileCommentsFailed,
  getProfileUpvotedPostsCompletedAction,
  getProfileUpvotedPostsFailed,
  getProfileDownvotedPostsCompletedAction,
  getProfileDownvotedPostsFailed,
  getProfileSavedPostsCompletedAction,
  getProfileSavedPostsFailed,
  getProfilePostsCompletedAction,
  getProfilePostsFailed,
} from "../actions/profile";

export function* watchGetProfile() {
  yield takeEvery(ActionTypes.GET_PROFILE, getProfile);
}

export function* watchGetProfileComments() {
  yield takeEvery(ActionTypes.GET_PROFILE_COMMENTS, getProfileComments);
}

export function* watchGetProfileUpvoted() {
  yield takeEvery(ActionTypes.GET_PROFILE_UPVOTED_POSTS, getProfileUpvoted);
}

export function* watchGetProfileDownvoted() {
  yield takeEvery(ActionTypes.GET_PROFILE_DOWNVOTED_POSTS, getProfileUpvoted);
}

export function* watchProfileSaved() {
  yield takeEvery(ActionTypes.GET_PROFILE_SAVED_POSTS, getProfileSaved);
}

export function* watchProfilePosts() {
  yield takeEvery(ActionTypes.GET_PROFILE_POSTS, getProfilePosts);
}

export function* getProfilePosts(profileInfo: {
  type: string;
  payload: string;
}) {
  try {
    const profileReponse = yield call(
      getProfilePostsRequest,
      profileInfo.payload
    );
    yield put(getProfilePostsCompletedAction(profileReponse.body));
  } catch (error) {
    yield put(
      getProfilePostsFailed({
        status: error.status,
        text: error.response.body.message,
      })
    );
  }
}

export function* getProfileSaved(profileInfo: {
  type: string;
  payload: string;
}) {
  try {
    const profileReponse = yield call(
      getProfileSavedRequest,
      profileInfo.payload
    );
    yield put(getProfileSavedPostsCompletedAction(profileReponse.body));
  } catch (error) {
    yield put(
      getProfileSavedPostsFailed({
        status: error.status,
        text: error.response.body.message,
      })
    );
  }
}

export function* getProfileDownvoted(profileInfo: {
  type: string;
  payload: string;
}) {
  try {
    const profileReponse = yield call(
      getProfileDownvotedRequest,
      profileInfo.payload
    );
    yield put(getProfileDownvotedPostsCompletedAction(profileReponse.body));
  } catch (error) {
    yield put(
      getProfileDownvotedPostsFailed({
        status: error.status,
        text: error.response.body.message,
      })
    );
  }
}

export function* getProfileUpvoted(profileInfo: {
  type: string;
  payload: string;
}) {
  try {
    const profileReponse = yield call(
      getProfileUpvotedRequest,
      profileInfo.payload
    );
    yield put(getProfileUpvotedPostsCompletedAction(profileReponse.body));
  } catch (error) {
    yield put(
      getProfileUpvotedPostsFailed({
        status: error.status,
        text: error.response.body.message,
      })
    );
  }
}

export function* getProfileComments(profileInfo: {
  type: string;
  payload: string;
}) {
  try {
    const profileReponse = yield call(
      getProfileCommentsRequest,
      profileInfo.payload
    );

    yield put(getProfileCommentsCompletedAction(profileReponse.body));
  } catch (error) {
    yield put(
      getProfileCommentsFailed({
        status: error.status,
        text: error.response.body.message,
      })
    );
  }
}

export function* getProfile(profileInfo: { type: string; payload: string }) {
  try {
    const profileResponse = yield call(getProfileRequest, profileInfo.payload);

    yield put(getProfileCompletedAction(profileResponse.body));
  } catch (error) {
    yield put(
      getProfileFailed({
        status: error.status,
        text: error.response.body.message,
      })
    );
  }
}

export const getProfileRequest = (username: string) => {
  let response;

  try {
    response = superagent
      .agent()
      .withCredentials()
      .query({ order: "new" })
      .get(APIUrl + "/user/getProfile/" + username);
  } catch (error) {
    response = error.response;
  }
  return response;
};

export const getProfileCommentsRequest = (username: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "user/getProfileComments/" + username);
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const getProfileUpvotedRequest = (username: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "user/getUpvotes/" + username);
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const getProfileDownvotedRequest = (username: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "user/getDownvotes/" + username);
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const getProfileSavedRequest = (username: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "user/getSaved/" + username);
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const getProfilePostsRequest = (username: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .query({ order: "new" })
      .get(APIUrl + "user/getPosts/" + username);
  } catch (error) {
    response = error.response;
  }

  return response;
};
