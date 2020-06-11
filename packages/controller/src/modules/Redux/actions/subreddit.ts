import { ActionTypes } from "./types";

export const getSubreddit = (subName: string) => ({
  type: ActionTypes.GET_SUBREDDIT,
  payload: subName,
});

export const getSubredditCompletedAction = (subreddit: {
  id: number;
  name: string;
  owner_id: string;
  topics: string[];
  description: string;
  adultContent: boolean;
  joined: number;
}) => ({
  type: ActionTypes.GET_SUBREDDIT_COMPLETED,
  payload: subreddit,
});

export const getSubredditFailed = (status: number) => ({
  type: ActionTypes.GET_SUBREDDIT_FAILED,
  payload: status,
});
