import { ActionTypes } from "./types";

export const createPost = (post: {
  subName: string;
  title: string;
  content: string[];
}) => ({
  type: ActionTypes.CREATE_POST,
  payload: post,
});

export const votePost = (voteInfo: { postId: number; voteValue: number }) => ({
  type: ActionTypes.VOTE_POST,
  payload: voteInfo,
});
