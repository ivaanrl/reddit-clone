import { Post } from "../../../shared/interfaces";
import { ActionTypes } from "./types";

export const getSubreddit = (
  subName: string,
  order: string,
  time: string,
  page: number
) => ({
  type: ActionTypes.GET_SUBREDDIT,
  payload: { subName, order, time, page },
});

export const getSubredditCompletedAction = (subreddit: {
  name: string;
  owner_id: string;
  topics: string[];
  description: string;
  adultContent: boolean;
  joined: number;
  createdAt: string;
  mods: string[];
  posts: Post[];
}) => ({
  type: ActionTypes.GET_SUBREDDIT_COMPLETED,
  payload: subreddit,
});

export const getSubredditFailed = (message: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.GET_SUBREDDIT_FAILED,
  payload: message,
});

export const createSubreddit = (subreddit: {
  name: string;
  communityTopics: string[];
  description: string;
  adultContent: boolean;
}) => ({
  type: ActionTypes.CREATE_SUBREDDIT,
  payload: subreddit,
});

export const createSubredditCompletedAction = (message: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.CREATE_SUBREDDIT_COMPLETED,
  payload: message,
});

export const joinOrLeaveSubreddit = (subName: string) => ({
  type: ActionTypes.JOIN_LEAVE_SUBREDDIT,
  payload: subName,
});

export const joinOrLeaveSubredditCompletedAction = (isUserJoined: boolean) => ({
  type: ActionTypes.JOIN_LEAVE_SUBREDDIT_COMPLETED,
  payload: isUserJoined,
});

export const removeSubredditErrors = () => ({
  type: ActionTypes.REMOVE_SUBREDDIT_ERRORS,
});

export const switchSubredditLoadingState = () => ({
  type: ActionTypes.SWITCH_SUBREDDIT_LOADING_STATE,
});

export const clearSubredditPosts = () => ({
  type: ActionTypes.CLEAR_SUBREDDIT_POSTS,
});
