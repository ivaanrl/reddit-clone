import { Post } from "../../../shared/interfaces";
import { ActionTypes } from "./types";

export const getHomepagePosts = (
  order: string,
  time: string,
  page: number
) => ({
  type: ActionTypes.GET_HOMEPAGE_POSTS,
  payload: { order, time, page },
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

export const switchHomepageLoadingStae = () => ({
  type: ActionTypes.SWITCH_HOMEPAGE_LOADING_STATE,
});

export const clearHomepagePosts = () => ({
  type: ActionTypes.CLEAR_HOMEPAGE_POSTS,
});
