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
} from "./profile";

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
};

export * from "./types";
