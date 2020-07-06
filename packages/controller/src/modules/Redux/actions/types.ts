export const ActionTypes = {
  GET_HOMEPAGE: "[0] GET HOMEPAGE POSTS FROM SERVER",
  SIGNIN_USER: "[1] START SIGNIN USER",
  SIGNIN_USER_COMPLETED: "[2] COMPLETE SIGNIN",
  SIGNUP_USER: "[3] SIGNUP USER",
  SIGNUP_USER_COMPLETED: "[4] COMPLETE SIGNUP USER",
  SIGNUP_USER_FAILED: "[5] SIGN UP USER FAILED",
  SIGNIN_USER_FAILED: "[6] SIGN IN USER FAILED",
  SIGN_OUT_USER: "[7] SIGN OUT USER",
  SIGN_OUT_USER_COMPLETED: "[8] COMPLETE SIGN OUT USER",
  GET_SUBREDDIT: "[9] START GET SUBREDDIT",
  GET_SUBREDDIT_COMPLETED: "[10] COMPLETE GET SUBREDDIT",
  GET_SUBREDDIT_FAILED: "[11] GET SUBREDDIT FAILED",
  CREATE_POST: "[12] CREATE POST",
  CREATE_POST_COMPLETED: "[13] COMPLETE CREATE POST",
  CREATE_SUBREDDIT: "[14] CREATE SUBREDDIT",
  CREATE_SUBREDDIT_COMPLETED: "[15] COMPLETE CREATE SUBREDDIT",
  VOTE_POST: "[16] VOTE POST",
  UPDATE_POST_VOTES: "[17] UPDATE POST VOTES",
  GET_FULL_POST: "[18] GET FULL POST",
  GET_FULL_POST_COMPLETED: "[19] COMPLETE GET FULL POST",
  VOTE_FULL_POST: "[20] VOTE FULL POST",
  UPDATE_FULL_POST_VOTES: "[21] UPDATE FULL POST VOTES",
  COMMENT_FULL_POST: "[22] COMMENT FULL POST",
  COMMENT_FULL_POST_COMPLETED: "[23] COMPLETE COMMENT FULL POST",
  REPLY_COMMENT: "[24] REPLY COMMENT",
  REPLY_COMMENT_COMPLETED: "[25] COMPLETE REPLY COMMENT",
  VOTE_COMMENT: "[26] VOTE COMMENT",
  VOTE_COMMENT_COMPLETED: "[27] VOTE COMMENT COMPLETED",
  JOIN_LEAVE_SUBREDDIT: "[28] JOIN/LEAVE SUBREDDIT",
  JOIN_LEAVE_SUBREDDIT_COMPLETED: "[29] COMPLETE JOIN/LEAVE SUBREDDIT",
};

export interface BaseAction {
  type: string;
  payload?: any;
}
