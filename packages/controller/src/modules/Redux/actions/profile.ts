import { Post } from "../../../shared/interfaces";
import { ActionTypes } from "./types";

export const getProfile = (username: string) => ({
  type: ActionTypes.GET_PROFILE,
  payload: username,
});

export const getProfileCompletedAction = (userInfo: {
  id: string;
  username: string;
  karma: number;
  createdAt: string;
}) => ({
  type: ActionTypes.GET_PROFILE_COMPLETED,
  payload: userInfo,
});

export const getProfileFailed = (error: { status: number; text: string }) => ({
  type: ActionTypes.GET_PROFILE_FAILED,
  payload: error,
});

export const getProfilePosts = (
  username: string,
  order: string,
  time: string,
  page: number
) => ({
  type: ActionTypes.GET_PROFILE_POSTS,
  payload: { username, order, time, page },
});

export const getProfilePostsCompletedAction = (
  userPosts: {
    id: string;
    subreddit_name: string;
    title: string;
    voteCount: number;
    user_vote: number;
  }[]
) => ({
  type: ActionTypes.GET_PROFILE_POSTS_COMPLETED,
  payload: userPosts,
});

export const getProfilePostsFailed = (error: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.GET_PROFILE_POSTS_FAILED,
  payload: error,
});

export const getProfileUpvotedPosts = (
  username: string,
  order: string,
  time: string,
  page: number
) => ({
  type: ActionTypes.GET_PROFILE_UPVOTED_POSTS,
  payload: { username, order, time, page },
});

export const getProfileUpvotedPostsCompletedAction = (userPosts: Post[]) => ({
  type: ActionTypes.GET_PROFILE_UPVOTED_POSTS_COMPLETED,
  payload: userPosts,
});

export const getProfileUpvotedPostsFailed = (error: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.GET_PROFILE_UPVOTED_POSTS_FAILED,
  payload: error,
});

export const getProfileDownvotedPosts = (
  username: string,
  order: string,
  time: string,
  page: number
) => ({
  type: ActionTypes.GET_PROFILE_DOWNVOTED_POSTS,
  payload: { username, order, time, page },
});

export const getProfileDownvotedPostsCompletedAction = (userPosts: Post[]) => ({
  type: ActionTypes.GET_PROFILE_DOWNVOTED_POSTS_COMPLETED,
  payload: userPosts,
});

export const getProfileDownvotedPostsFailed = (error: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.GET_PROFILE_DOWNVOTED_POSTS_FAILED,
  payload: error,
});

export const getProfileSavedPosts = (username: string) => ({
  type: ActionTypes.GET_PROFILE_SAVED_POSTS,
  payload: username,
});

export const getProfileSavedPostsCompletedAction = (userPosts: Post[]) => ({
  type: ActionTypes.GET_PROFILE_SAVED_POSTS_COMPLETED,
  payload: userPosts,
});

export const getProfileSavedPostsFailed = (error: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.GET_PROFILE_SAVED_POSTS_FAILED,
  payload: error,
});

export const getProfileComments = (
  username: string,
  order: string,
  time: string,
  page: number
) => ({
  type: ActionTypes.GET_PROFILE_COMMENTS,
  payload: { username, order, time, page },
});

export const getProfileCommentsCompletedAction = (userPosts: Post[]) => ({
  type: ActionTypes.GET_PROFILE_COMMENTS_COMPLETED,
  payload: userPosts,
});

export const getProfileCommentsFailed = (error: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.GET_PROFILE_COMMENTS_FAILED,
  payload: error,
});

export const replyCommentInProfile = (commentInfo: {
  commentId: string;
  content: string[];
}) => ({
  type: ActionTypes.REPLY_COMMENT_IN_PROFILE,
  payload: commentInfo,
});

export const replyCommentInProfileCompletedAction = (success: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.REPLY_COMMENT_IN_PROFILE_COMPLETED,
  payload: success,
});

export const replyCommentInProfileFailed = (error: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.REPLY_COMMENT_IN_PROFILE_FAILED,
  payload: error,
});

export const removeProfileMessages = () => ({
  type: ActionTypes.REMOVE_PROFILE_MESSAGES,
});

export const clearProfilePosts = () => ({
  type: ActionTypes.CLEAR_PROFILE_POSTS,
});

export const updateProfilePostVotes = (voteInfo: {
  index: number;
  value: number;
}) => ({
  type: ActionTypes.UPDATE_PROFILE_POST_VOTES,
  payload: voteInfo,
});

export const switchProfileLoadingState = () => ({
  type: ActionTypes.SWITCH_PROFILE_LOADING_STATE,
});
