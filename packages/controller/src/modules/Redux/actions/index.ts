import {
  signinUser,
  signupUser,
  signinUserCompletedAction,
  signupUserCompletedAction,
  signinUserFailed,
  signupUserFailed,
  signoutUser,
  removeAuthErrors,
} from "./auth";

import {
  getSubreddit,
  getSubredditCompletedAction,
  getSubredditFailed,
  createSubreddit,
  createSubredditCompletedAction,
  joinOrLeaveSubreddit,
  joinOrLeaveSubredditCompletedAction,
  removeSubredditErrors,
  clearSubredditPosts,
} from "./subreddit";

import {
  createPost,
  votePost,
  updatePostVotes,
  getFullPost,
  getFullPostCompletedAction,
  voteFullPost,
  updateFullPostVotes,
  commentFullPost,
  commentFullPostCompletedAction,
  replyComment,
  replyCommentCompletedAction,
  voteComment,
  voteCommentCompletedAction,
  removeFullPostErrors,
  updateHomepagePostVotes,
  createImagePost,
  savePost,
  saveHomePostFailed,
  saveSubredditPostFailed,
  saveHomePostCompletedAction,
  saveSubredditPostCompletedAction,
} from "./post";

import {
  getProfile,
  getProfileCompletedAction,
  getProfileFailed,
  getProfilePosts,
  getProfilePostsCompletedAction,
  getProfilePostsFailed,
  getProfileSavedPosts,
  getProfileSavedPostsCompletedAction,
  getProfileSavedPostsFailed,
  getProfileUpvotedPostsFailed,
  getProfileUpvotedPostsCompletedAction,
  getProfileCommentsFailed,
  getProfileCommentsCompletedAction,
  getProfileComments,
  getProfileDownvotedPosts,
  getProfileDownvotedPostsCompletedAction,
  getProfileDownvotedPostsFailed,
  getProfileUpvotedPosts,
  replyCommentInProfileFailed,
  replyCommentInProfileCompletedAction,
  replyCommentInProfile,
  removeProfileMessages,
  clearProfilePosts,
} from "./profile";

import {
  getPreviewSearchResultFailed,
  getPreviewSearchResultsCompletedAction,
  getPreviewSearchResults,
} from "./search";

import {
  getHomepagePosts,
  getHomepagePostsCompletedAction,
  getHomepagePostsFailed,
  clearHomepagePosts,
} from "./homepage";

import {
  getNotifications,
  getNotificationsCompletedAction,
  replyCommentInNotificationFailed,
  replyCommentInNotificationCompletedAction,
  replyCommentInNotification,
  changeNotificationStatusCompletedAction,
  changeNotificationStatus,
} from "./notifications";

export const allActions = {
  signinUser,
  signupUser,
  signinUserCompletedAction,
  signupUserCompletedAction,
  signinUserFailed,
  signupUserFailed,
  signoutUser,
  getSubreddit,
  getSubredditCompletedAction,
  getSubredditFailed,
  createSubreddit,
  createSubredditCompletedAction,
  createPost,
  votePost,
  updatePostVotes,
  getFullPost,
  getFullPostCompletedAction,
  voteFullPost,
  updateFullPostVotes,
  commentFullPost,
  commentFullPostCompletedAction,
  replyComment,
  replyCommentCompletedAction,
  voteComment,
  voteCommentCompletedAction,
  joinOrLeaveSubreddit,
  joinOrLeaveSubredditCompletedAction,
  removeAuthErrors,
  removeFullPostErrors,
  removeSubredditErrors,
  getProfile,
  getProfileCompletedAction,
  getProfileFailed,
  getProfilePosts,
  getProfilePostsCompletedAction,
  getProfilePostsFailed,
  getProfileSavedPosts,
  getProfileSavedPostsCompletedAction,
  getProfileSavedPostsFailed,
  getProfileUpvotedPostsFailed,
  getProfileUpvotedPostsCompletedAction,
  getProfileCommentsFailed,
  getProfileCommentsCompletedAction,
  getProfileComments,
  getProfileDownvotedPosts,
  getProfileDownvotedPostsCompletedAction,
  getProfileDownvotedPostsFailed,
  getProfileUpvotedPosts,
  replyCommentInProfileFailed,
  replyCommentInProfileCompletedAction,
  replyCommentInProfile,
  removeProfileMessages,
  getPreviewSearchResultFailed,
  getPreviewSearchResultsCompletedAction,
  getPreviewSearchResults,
  getHomepagePosts,
  getHomepagePostsCompletedAction,
  getHomepagePostsFailed,
  clearProfilePosts,
  updateHomepagePostVotes,
  createImagePost,
  clearHomepagePosts,
  clearSubredditPosts,
  getNotifications,
  getNotificationsCompletedAction,
  replyCommentInNotificationFailed,
  replyCommentInNotificationCompletedAction,
  replyCommentInNotification,
  changeNotificationStatusCompletedAction,
  changeNotificationStatus,
  savePost,
  saveHomePostFailed,
  saveSubredditPostFailed,
  saveHomePostCompletedAction,
  saveSubredditPostCompletedAction,
};

export * from "./types";
