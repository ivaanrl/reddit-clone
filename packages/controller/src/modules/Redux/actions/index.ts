import {
  signinUser,
  signupUser,
  signinUserCompletedAction,
  signupUserCompletedAction,
  signinUserFailed,
  signupUserFailed,
  signoutUser,
} from "./auth";

import {
  getSubreddit,
  getSubredditCompletedAction,
  getSubredditFailed,
  createSubreddit,
  createSubredditCompletedAction,
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
} from "./post";

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
};

export * from "./types";
