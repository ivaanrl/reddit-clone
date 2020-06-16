import { ActionTypes } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";

export function* watchCreatePost() {
  yield takeEvery(ActionTypes.CREATE_POST, createPost);
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
