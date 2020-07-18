import { ActionTypes } from "./types";
import { Post } from "../reducers/subreddit";

export const getHomepagePosts = (order: string, time: string) => ({
  type: ActionTypes.GET_HOMEPAGE_POSTS,
  payload: { order, time },
});

export const getHomepagePostsCompletedAction = (posts: Post[]) => ({
  type: ActionTypes.GET_HOMEPAGE_POSTS_COMPLETED,
  payload: posts,
});

export const getHomepagePostsFailed = (error: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.GET_HOMEPAGE_POSTS_FAILED,
  payload: error,
});
