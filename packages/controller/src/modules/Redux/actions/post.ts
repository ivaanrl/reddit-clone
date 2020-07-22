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
