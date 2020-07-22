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
} from "./homepage";

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
};

export * from "./types";
