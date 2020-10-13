import { ActionTypes } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import APIUrl from "../../../requestInfo";
import {
  updatePostVotes,
  getFullPostCompletedAction,
  updateFullPostVotes,
  commentFullPostCompletedAction,
  replyCommentCompletedAction,
  voteCommentCompletedAction,
  updateHomepagePostVotes,
  saveSubredditPostCompletedAction,
  saveHomePostCompletedAction,
  saveSubredditPostFailed,
  saveHomePostFailed,
  saveProfilePostFailed,
  saveProfilePostCompletedAction,
  deletePostCompletedAction,
  deletePostFailed,
  deleteCommentCompletedAction,
} from "../actions/post";
import { updateProfilePostVotes } from "../actions/profile";

export function* watchCreatePost() {
  yield takeEvery(ActionTypes.CREATE_POST, createPost);
}

export function* watchCreateImagePost() {
  yield takeEvery(ActionTypes.CREATE_IMAGE_POST, createImagePost);
}

export function* watchVotePost() {
  yield takeEvery(ActionTypes.VOTE_POST, votePost);
}

export function* watchGetFullPost() {
  yield takeEvery(ActionTypes.GET_FULL_POST, getFullPost);
}

export function* watchVoteFullPost() {
  yield takeEvery(ActionTypes.VOTE_FULL_POST, voteFullPost);
}

export function* watchCommentFullPost() {
  yield takeEvery(ActionTypes.COMMENT_FULL_POST, commentFullPost);
}

export function* watchReplyComment() {
  yield takeEvery(ActionTypes.REPLY_COMMENT, replyComment);
}

export function* watchVoteComment() {
  yield takeEvery(ActionTypes.VOTE_COMMENT, voteComment);
}

export function* watchSavePost() {
  yield takeEvery(ActionTypes.SAVE_POST, savePost);
}

export function* watchDeletePost() {
  yield takeEvery(ActionTypes.DELETE_POST, deletePost);
}

export function* watchDeleteComment() {
  yield takeEvery(ActionTypes.DELETE_COMMENT, deleteComment);
}

export function* createPost(post: {
  type: string;
  payload: {
    subName: string;
    title: string;
    type: string;
    content?: string[];
    link?: string;
  };
}) {
  try {
    const response = yield call(createPostRequest, post.payload);
  } catch (error) {
    console.log(error);
  }
}

export function* createImagePost(post: {
  type: string;
  payload: {
    subName: string;
    title: string;
    type: string;
    image: FileList;
  };
}) {
  try {
    const response = yield call(createImagePostRequest, post.payload);
  } catch (error) {
    console.log(error);
  }
}

export function* getFullPost(post: { type: string; payload: string }) {
  try {
    const response = yield call(getFullPostRequest, post.payload);
    yield put(getFullPostCompletedAction(response.body));
  } catch (error) {
    alert("HANDLE ERROR");
  }
}

export function* votePost(postInfo: {
  type: string;
  payload: {
    voteValue: number;
    postId: string;
    index: number;
    reducer: string;
  };
}) {
  try {
    const response = yield call(votePostRequest, postInfo.payload);

    switch (response.body.reducerToEdit) {
      case "subreddit":
        yield put(
          updatePostVotes({
            index: postInfo.payload.index,
            value: postInfo.payload.voteValue,
          })
        );
        break;
      case "homepage":
        yield put(
          updateHomepagePostVotes({
            index: postInfo.payload.index,
            value: postInfo.payload.voteValue,
          })
        );
        break;
      case "profile":
        yield put(
          updateProfilePostVotes({
            index: postInfo.payload.index,
            value: postInfo.payload.voteValue,
          })
        );
      default:
        return;
    }
  } catch (error) {
    console.log(error);
  }
}

export function* savePost(postInfo: {
  type: string;
  payload: {
    postId: string;
    index: number;
    reducer: string;
  };
}) {
  const { reducer, postId, index } = postInfo.payload;
  try {
    const response = yield call(savePostRequest, postId);
    switch (reducer) {
      case "subreddit":
        yield put(
          saveSubredditPostCompletedAction({
            index,
          })
        );
        break;
      case "homepage":
        yield put(
          saveHomePostCompletedAction({
            index,
          })
        );
        break;
      case "profile":
        yield put(
          saveProfilePostCompletedAction({
            index,
          })
        );
        break;
      default:
        break;
    }
  } catch (error) {
    switch (reducer) {
      case "subreddit":
        yield put(
          saveSubredditPostFailed({
            text: error.response.body.message,
            status: error.response.status,
          })
        );
        break;
      case "homepage":
        yield put(
          saveHomePostFailed({
            text: error.response.body.message,
            status: error.response.status,
          })
        );
        break;
      case "profile":
        yield put(
          saveProfilePostFailed({
            text: error.response.body.message,
            status: error.response.status,
          })
        );
        break;
      default:
        break;
    }
  }
}

export function* voteFullPost(postInfo: {
  type: string;
  payload: { voteValue: number; postId: string };
}) {
  try {
    yield call(votePostRequest, {
      ...postInfo.payload,
      ...{ reducer: "fullpost" },
    });
    yield put(updateFullPostVotes(postInfo.payload.voteValue));
  } catch (error) {
    console.log(error);
  }
}

export function* commentFullPost(postInfo: {
  type: string;
  payload: { postId: number; content: string[] };
}) {
  try {
    yield call(commentFullPostRequest, postInfo.payload);
    yield put(commentFullPostCompletedAction(postInfo.payload.content));
  } catch (error) {}
}

export function* replyComment(comment: {
  type: string;
  payload: {
    commentId: number;
    content: string[];
  };
}) {
  try {
    const replyResponse = yield call(replyCommentRequest, comment.payload);

    const { reply } = replyResponse.body;

    console.log(reply);
    reply.user_vote = 0;
    reply.votes = 0;
    reply.replies = [];

    yield put(replyCommentCompletedAction(reply));
  } catch (error) {
    console.log(error);
  }
}

export function* voteComment(comment: {
  type: string;
  payload: {
    path: string[];
    voteValue: number;
    reducer: string;
  };
}) {
  try {
    const voteResponse = yield call(voteCommentRequest, comment.payload);
    if (voteResponse.status === 201) {
      yield put(voteCommentCompletedAction(comment.payload));
    }
  } catch (error) {}
}

export function* deletePost(post: { type: string; payload: string }) {
  try {
    const deletePostResponse = yield call(deletePostRequest, post.payload);
    if (deletePostResponse.status === 201) {
      yield put(deletePostCompletedAction());
    }
  } catch (error) {
    yield put(
      deletePostFailed({
        text: error.response.body.message,
        status: error.response.status,
      })
    );
  }
}

export function* deleteComment(comment: {
  type: string;
  payload: { path: string[]; commentId: string };
}) {
  try {
    const deleteCommentResponse = yield call(
      deleteCommentRequest,
      comment.payload.commentId
    );
    if (deleteCommentResponse.status === 201) {
      yield put(deleteCommentCompletedAction(comment.payload.path));
    }
  } catch (error) {
    yield put(
      deletePostFailed({
        text: error.response.body.message,
        status: error.response.status,
      })
    );
  }
}

export const deletePostRequest = (postId: string) => {
  let response;

  try {
    response = superagent
      .agent()
      .withCredentials()
      .delete(APIUrl + "/post/deletePost/" + postId);
  } catch (error) {
    response = error;
  }

  return response;
};

export const deleteCommentRequest = (commentId: string) => {
  let response;

  try {
    response = superagent
      .agent()
      .withCredentials()
      .delete(APIUrl + "/post/deleteComment/" + commentId);
  } catch (error) {
    response = error;
  }

  return response;
};

export const voteCommentRequest = (commentInfo: {
  path: string[];
  voteValue: number;
  reducer: string;
}) => {
  const { path, voteValue, reducer } = commentInfo;
  let response;

  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/post/vote/")
      .send({ voteValue, postId: path[path.length - 1], reducer });
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const replyCommentRequest = (commentInfo: {
  commentId: number;
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

export const commentFullPostRequest = (post: {
  postId: number;
  content: string[];
}) => {
  let response;

  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/post/comment")
      .send(post);
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const createPostRequest = (post: {
  subName: string;
  title: string;
  type: string;
  content?: string[];
  link?: string;
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

export const createImagePostRequest = (post: {
  subName: string;
  title: string;
  type: string;
  image: FileList;
}) => {
  const { subName, title, type, image } = post;
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      //Need to be commented out so browser can add boundary
      //.set("Content-Type", "multipart/form-data")
      .post(APIUrl + "/post/createImagePost")
      .field("subName", subName)
      .field("title", title)
      .field("type", type)
      .attach("files", image[0]);
  } catch (error) {
    response = error.response;
  }
  return response;
};

export const getFullPostRequest = (postId: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "/post/getPost/" + postId);
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const votePostRequest = ({
  voteValue,
  postId,
  reducer,
}: {
  voteValue: number;
  postId: string;
  reducer: string;
}) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/post/vote/")
      .send({ voteValue, postId, reducer });
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const savePostRequest = (postId: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/post/savePost/")
      .send({ postId });
  } catch (error) {
    response = error.response;
  }

  return response;
};
