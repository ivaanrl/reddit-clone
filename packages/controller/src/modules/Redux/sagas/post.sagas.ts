import { ActionTypes } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";

export function* watchCreatePost() {
  yield takeEvery(ActionTypes.CREATE_POST, createPost);
}

export function* watchVotePost() {
  yield takeEvery(ActionTypes.VOTE_POST, votePost);
}

export function* createPost(post: {
  type: string;
  payload: {
    subName: string;
    title: string;
    content: string[];
  };
}) {
  try {
    const response = yield call(createPostRequest, post.payload);
  } catch (error) {
    console.log(error);
  }
}

export function* votePost(postInfo: {
  type: string;
  payload: { voteValue: number; postId: number };
}) {
  try {
    const response = yield call(votePostRequest, postInfo.payload);
  } catch (error) {
    console.log(error);
  }
}

export const createPostRequest = (post: {
  subName: string;
  title: string;
  content: string[];
}) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/post/createPost")
      .send(post);
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const votePostRequest = ({
  voteValue,
  postId,
}: {
  voteValue: number;
  postId: number;
}) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/post/vote/" + postId)
      .send({ voteValue });
  } catch (error) {
    response = error.response;
  }

  return response;
};
