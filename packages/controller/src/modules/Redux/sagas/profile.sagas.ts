import { ActionTypes } from "../actions";
import { takeEvery, call, put, takeLeading } from "redux-saga/effects";
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
  replyCommentInProfileCompletedAction,
  replyCommentInProfileFailed,
  switchProfileLoadingState,
} from "../actions/profile";

export function* watchGetProfile() {
  yield takeEvery(ActionTypes.GET_PROFILE, getProfile);
}

export function* watchGetProfileComments() {
  yield takeLeading(ActionTypes.GET_PROFILE_COMMENTS, getProfileComments);
}

export function* watchGetProfileUpvoted() {
  yield takeLeading(ActionTypes.GET_PROFILE_UPVOTED_POSTS, getProfileUpvoted);
}

export function* watchGetProfileDownvoted() {
  yield takeLeading(
    ActionTypes.GET_PROFILE_DOWNVOTED_POSTS,
    getProfileDownvoted
  );
}

export function* watchProfileSaved() {
  yield takeEvery(ActionTypes.GET_PROFILE_SAVED_POSTS, getProfileSaved);
}

export function* watchProfilePosts() {
  yield takeLeading(ActionTypes.GET_PROFILE_POSTS, getProfilePosts);
}

export function* watchReplyCommentInProfile() {
  yield takeEvery(ActionTypes.REPLY_COMMENT_IN_PROFILE, replyCommentInProfile);
}

export function* replyCommentInProfile(commentInfo: {
  type: string;
  payload: { commentId: string; content: string[] };
}) {
  try {
    const replyResponse = yield call(
      replyCommentInProfileRequest,
      commentInfo.payload
    );
    yield put(
      replyCommentInProfileCompletedAction({
        status: replyResponse.status,
        text: replyResponse.body.message,
      })
    );
  } catch (error) {
    yield put(replyCommentInProfileFailed(error.response.body));
  }
}

export function* getProfilePosts(profileInfo: {
  type: string;
  payload: { username: string; order: string; time: string; page: number };
}) {
  try {
    yield put(switchProfileLoadingState());
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
    yield put(switchProfileLoadingState());
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
  payload: { username: string; order: string; time: string; page: number };
}) {
  try {
    yield put(switchProfileLoadingState());
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
  payload: { username: string; order: string; time: string; page: number };
}) {
  try {
    yield put(switchProfileLoadingState());
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
  payload: { username: string; order: string; time: string; page: number };
}) {
  try {
    yield put(switchProfileLoadingState());
    const profileReponse = yield call(
      getProfileCommentsRequest,
      profileInfo.payload
    );

    yield put(getProfileCommentsCompletedAction(profileReponse.body));
  } catch (error) {
    console.log(error);
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

export const replyCommentInProfileRequest = (commentInfo: {
  commentId: string;
  content: string[];
}) => {
  let response;

  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/post/replyComment")
      .send(commentInfo);
  } catch (error) {
    response = error.response;
  }

  return response;
};

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

export const getProfileCommentsRequest = (info: {
  username: string;
  order: string;
  time: string;
  page: number;
}) => {
  const { username, order, time, page } = info;
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "/user/getProfileComments/" + username)
      .query({ order, time, page });
  } catch (error) {
    console.log(error);
    response = error.response;
  }

  return response;
};

export const getProfileUpvotedRequest = (info: {
  username: string;
  order: string;
  time: string;
  page: number;
}) => {
  const { username, order, time, page } = info;
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "/user/getUpvotes/" + username)
      .query({ order, time, page });
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const getProfileDownvotedRequest = (info: {
  username: string;
  order: string;
  time: string;
  page: number;
}) => {
  const { username, order, time, page } = info;
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "/user/getDownvotes/" + username)
      .query({ order, time, page });
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
      .get(APIUrl + "/user/getSaved/" + username);
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const getProfilePostsRequest = (info: {
  username: string;
  order: string;
  time: string;
  page: number;
}) => {
  const { order, username, time, page } = info;
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .query({ order, time, page })
      .get(APIUrl + "/user/getPosts/" + username);
  } catch (error) {
    response = error.response;
  }

  return response;
};
