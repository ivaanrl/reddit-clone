import { ActionTypes } from "./types";
import { Post } from "../reducers/subreddit";

export const getSubreddit = (subName: string, order: string, time: string) => ({
  type: ActionTypes.GET_SUBREDDIT,
  payload: { subName, order, time },
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

export const createSubredditCompletedAction = (subreddit: {
  name: string;
  owner_id: string;
  topics: string[];
  description: string;
  adultContent: boolean;
  joined: number;
  createdAt: string;
  mods: string[];
}) => ({
  type: ActionTypes.CREATE_SUBREDDIT_COMPLETED,
  payload: subreddit,
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
