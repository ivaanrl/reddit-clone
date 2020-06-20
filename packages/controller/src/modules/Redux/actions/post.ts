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
