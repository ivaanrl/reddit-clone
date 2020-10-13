import { ActionTypes } from "./types";

export const createPost = (
  post:
    | {
        subName: string;
        title: string;
        content: string[];
        type: string;
      }
    | { subName: string; title: string; link: string; type: string }
) => ({
  type: ActionTypes.CREATE_POST,
  payload: post,
});

export const createImagePost = (post: {
  subName: string;
  title: string;
  type: string;
  image: FileList;
}) => ({
  type: ActionTypes.CREATE_IMAGE_POST,
  payload: post,
});

export const votePost = (voteInfo: {
  postId: string;
  voteValue: number;
  index: number;
  reducer: string;
}) => ({
  type: ActionTypes.VOTE_POST,
  payload: voteInfo,
});

export const updatePostVotes = (voteInfo: {
  index: number;
  value: number;
}) => ({
  type: ActionTypes.UPDATE_POST_VOTES,
  payload: voteInfo,
});

export const updateHomepagePostVotes = (voteInfo: {
  index: number;
  value: number;
}) => ({
  type: ActionTypes.UPDATE_HOMEPAGE_POST_VOTES,
  payload: voteInfo,
});

export const getFullPost = (postId: string) => ({
  type: ActionTypes.GET_FULL_POST,
  payload: postId,
});

export const getFullPostCompletedAction = (postInfo: {
  id: number;
  author_id: string;
  title: string;
  content: string[];
  createdAt: string;
  updatedAt: string;
  subreddit_name: string;
  votes: number;
  author_username: string;
  user_vote: number;
}) => ({
  type: ActionTypes.GET_FULL_POST_COMPLETED,
  payload: postInfo,
});

export const voteFullPost = (postInfo: {
  postId: string;
  voteValue: number;
}) => ({
  type: ActionTypes.VOTE_FULL_POST,
  payload: postInfo,
});

export const updateFullPostVotes = (voteValue: number) => ({
  type: ActionTypes.UPDATE_FULL_POST_VOTES,
  payload: voteValue,
});

export const commentFullPost = (postInfo: {
  postId: string;
  content: string[];
}) => ({
  type: ActionTypes.COMMENT_FULL_POST,
  payload: postInfo,
});

export const commentFullPostCompletedAction = (comment: string[]) => ({
  type: ActionTypes.COMMENT_FULL_POST_COMPLETED,
  payload: comment,
});

export const replyComment = (commentInfo: {
  commentId: string;
  content: string[];
}) => ({
  type: ActionTypes.REPLY_COMMENT,
  payload: commentInfo,
});

export const replyCommentCompletedAction = (commentInfo: any) => ({
  type: ActionTypes.REPLY_COMMENT_COMPLETED,
  payload: commentInfo,
});

export const voteComment = (commentInfo: {
  path: string[];
  voteValue: number;
}) => ({
  type: ActionTypes.VOTE_COMMENT,
  payload: commentInfo,
});

export const voteCommentCompletedAction = (commentInfo: {
  path: string[];
  voteValue: number;
}) => ({
  type: ActionTypes.VOTE_COMMENT_COMPLETED,
  payload: commentInfo,
});

export const removeFullPostErrors = () => ({
  type: ActionTypes.REMOVE_FULL_POST_ERRORS,
});

export const savePost = (postInfo: {
  postId: string;
  reducer: string;
  index: number;
}) => ({
  type: ActionTypes.SAVE_POST,
  payload: postInfo,
});

export const saveHomePostCompletedAction = (postInfo: { index: number }) => ({
  type: ActionTypes.SAVE_HOME_POST_COMPLETED,
  payload: postInfo,
});

export const saveHomePostFailed = (error: {
  text: string;
  status: number;
}) => ({
  type: ActionTypes.SAVE_HOME_POST_FAILED,
  payload: error,
});

export const saveSubredditPostCompletedAction = (postInfo: {
  index: number;
}) => ({
  type: ActionTypes.SAVE_SUBREDDIT_POST_COMPLETED,
  payload: postInfo,
});

export const saveSubredditPostFailed = (error: {
  text: string;
  status: number;
}) => ({
  type: ActionTypes.SAVE_SUBREDDIT_POST_FAILED,
  payload: error,
});

export const saveProfilePostCompletedAction = (postInfo: {
  index: number;
}) => ({
  type: ActionTypes.SAVE_PROFILE_POST_COMPLETED,
  payload: postInfo,
});

export const saveProfilePostFailed = (error: {
  text: string;
  status: number;
}) => ({
  type: ActionTypes.SAVE_PROFILE_POST_FAILED,
  payload: error,
});

export const deletePost = (postId: string) => ({
  type: ActionTypes.DELETE_POST,
  payload: postId,
});

export const deletePostCompletedAction = () => ({
  type: ActionTypes.DELETE_POST_COMPLETED_ACTION,
});

export const deletePostFailed = (error: { text: string; status: number }) => ({
  type: ActionTypes.DELETE_POST_FAILED,
  payload: error,
});

export const deleteComment = (path: string[], commentId: string) => ({
  type: ActionTypes.DELETE_COMMENT,
  payload: { path, commentId },
});

export const deleteCommentCompletedAction = (path: string[]) => ({
  type: ActionTypes.DELETE_COMMENT_COMPLETED_ACTION,
  payload: path,
});

export const deleteCommentFailed = (error: {
  text: string;
  status: number;
}) => ({
  type: ActionTypes.DELETE_COMMENT_FAILED,
  payload: error,
});
