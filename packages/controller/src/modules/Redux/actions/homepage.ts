import { ActionTypes } from "./types";
import { Post } from "../reducers/subreddit";

export const getHomepagePosts = () => ({
  type: ActionTypes.GET_HOMEPAGE_POSTS,
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
