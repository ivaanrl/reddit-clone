import { ActionTypes } from "./types";

export const createPost = (post: {
  subName: string;
  title: string;
  content: string[];
}) => ({
  type: ActionTypes.CREATE_POST,
  payload: post,
});

export const votePost = (voteInfo: {
  postId: number;
  voteValue: number;
  index: number;
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

export const getFullPost = (postId: number) => ({
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
  postId: number;
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
  postId: number;
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
