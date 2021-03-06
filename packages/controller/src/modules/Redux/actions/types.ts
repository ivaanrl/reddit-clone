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
  REMOVE_AUTH_ERRORS: "[30] REMOVE AUTH ERRORS",
  REMOVE_SUBREDDIT_ERRORS: "[31] REMOVE SUBREDDIT ERRORS",
  REMOVE_FULL_POST_ERRORS: "[32] REMOVE FULL POST ERRORS",
  GET_PROFILE_POSTS: "[33] GET PROFILE POSTS",
  GET_PROFILE_POSTS_COMPLETED: "[34] COMPLETE GET PROFILE POSTS",
  GET_PROFILE_UPVOTED_POSTS: "[35] GET PROFILE UPVOTED POSTS",
  GET_PROFILE_UPVOTED_POSTS_COMPLETED:
    "[36] COMPLETE GET PROFILE UPVOTED POSTS",
  GET_PROFILE_DOWNVOTED_POSTS: "[37] GET PROFILE DOWNVOTED POSTS",
  GET_PROFILE_DOWNVOTED_POSTS_COMPLETED:
    "[38] COMPLETE GET PROFILE DOWNVOTED POSTS",
  GET_PROFILE_SAVED_POSTS: "[39] GET PROFILE SAVED POSTS",
  GET_PROFILE_SAVED_POSTS_COMPLETED: "[40] COMPLETE GET PROFILE SAVED POSTS",
  GET_PROFILE_COMMENTS: "[41] GET PROFILE COMMENTS",
  GET_PROFILE_COMMENTS_COMPLETED: "[42] COMPLETE GET PROFILE COMMENTS",
  GET_PROFILE: "[43] GET PROFILE",
  GET_PROFILE_COMPLETED: "[44] COMPLETE GET PROFILE",
  GET_PROFILE_FAILED: "[45] GET PROFILE FAILED",
  GET_PROFILE_UPVOTED_POSTS_FAILED: "[46] GET PROFILE UPVOTED POSTS FAILED",
  GET_PROFILE_POSTS_FAILED: "[47] GET PROFILE POSTS FAILED",
  GET_PROFILE_DOWNVOTED_POSTS_FAILED: "[48] GET PROFILE POSTS FAILED",
  GET_PROFILE_SAVED_POSTS_FAILED: "[49] GET PROFILE SAVED POSTS FAILED",
  GET_PROFILE_COMMENTS_FAILED: "[50] GET PROFILE COMMENTS FAILES",
  REPLY_COMMENT_IN_PROFILE: "[51] REPLY COMMENT IN PROFILE",
  REPLY_COMMENT_IN_PROFILE_COMPLETED: "[52] COMPLETE REPLY COMMENT IN PROFILE",
  REPLY_COMMENT_IN_PROFILE_FAILED: "[52] REPLY COMMENT IN PROFILE FAILED",
  REMOVE_PROFILE_MESSAGES: "[53] REMOVE PROFILE MESSAGES",
  GET_PREVIEW_SEARCH_RESULTS: "[54] GET PREVIEW SEARCH RESULTS",
  GET_PREVIEW_SEARCH_RESULTS_COMPLETED:
    "[55] COMPLETE GET PREVIEW SEARCH RESULTS",
  GET_PREVIEW_SEARCH_RESULTS_FAILED: "[56] GET PREVIEW SEARCH RESULTS FAILED",
  GET_HOMEPAGE_POSTS: "[57] GET HOMEPAGE POSTS",
  GET_HOMEPAGE_POSTS_COMPLETED: "[58] COMPLETE GET HOMEPAGE POSTS",
  GET_HOMEPAGE_POSTS_FAILED: "[59] GET HOMEPAGES POSTS FAILED",
  UPDATE_HOMEPAGE_POST_VOTES: "[60] UPDATE HOMEPAGE POST VOTES",
  CLEAR_PROFILE_POSTS: "[61] CLEAR PROFILE POSTS",
  UPDATE_PROFILE_POST_VOTES: "[62] UPDATE PROFILE POST VOTES",
  SWITCH_PROFILE_LOADING_STATE: "[63] SWITCH PROFILE LOADING STATE",
  SWITCH_SUBREDDIT_LOADING_STATE: "[64] SWITCH SUBREDDIT LOADING STATE",
  SWITCH_HOMEPAGE_LOADING_STATE: "[65] SWICH HOMEPAGE LOADING STATE",
  CREATE_IMAGE_POST: "[66] CREATE IMAGE POST",
  CLEAR_HOMEPAGE_POSTS: "[67] CLEAR HOMEPAGE POSTS",
  CLEAR_SUBREDDIT_POSTS: "[68] CLEAR SUBREDDIT POSTS",
  GET_NOTIFICATIONS: "[69] GET NOTIFICATIONS",
  GET_NOTIFICATIONS_COMPLETED: "[70] COMPLETE GET NOTIFICATIONS",
  REPLY_COMMENT_IN_NOTIFICATION: "[71] REPLY COMMENT IN NOTIFICATION",
  REPLY_COMMENT_IN_NOTIFICATION_COMPLETED:
    "[72] COMPLETE REPLY COMMENT IN NOTIFICATION",
  REPLY_COMMENT_IN_NOTIFICATION_FAILED:
    "[73] FAIL REPLY COMMENT IN NOTIFICATION",
  CHANGE_NOTIFICATION_STATUS: "[74] CHANGE NOTIFICATION STATUS",
  CHANGE_NOTIFICATION_STATUS_COMPLETED:
    "[74] COMPLETE CHANGE NOTIFICATION STATUS",
  CHANGE_NOTIFICATION_STATUS_FAILED: "[75] FAIL CHANGE NOTIFICATION STATUS",
  SAVE_POST: "[76] SAVE POST",
  SAVE_HOME_POST_COMPLETED: "[77] COMPLETE SAVE HOME POST",
  SAVE_HOME_POST_FAILED: "[78] FAIL SAVE HOME POST",
  SAVE_SUBREDDIT_POST_COMPLETED: "[79] COMPLETE SAVE SUBREDDIT POST",
  SAVE_SUBREDDIT_POST_FAILED: "[80] FAIL SAVE SUBREDDIT POST",
  SAVE_COMMENT: "[81] SAVE COMMENT",
  SAVE_COMMENT_COMPLETED: "[82] COMPLETE SAVE COMMENT",
  SAVE_COMMENT_FAILED: "[83] FAIL SAVE COMMENT",
  SAVE_PROFILE_POST_COMPLETED: "[84] COMPLETE SAVE PROFILE POST",
  SAVE_PROFILE_POST_FAILED: "[85] FAIL SAVE PROFILE POST",
  DELETE_POST: "[86] DELETE POST",
  DELETE_POST_COMPLETED_ACTION: "[87] COMPLETE DELETE POST",
  DELETE_POST_FAILED: "[88] FAIL DELETE POST",
  DELETE_COMMENT: "[86] DELETE COMMENT",
  DELETE_COMMENT_COMPLETED_ACTION: "[87] COMPLETE DELETE COMMENT",
  DELETE_COMMENT_FAILED: "[88] FAIL DELETE COMMENT"
};

export interface BaseAction {
  type: string;
  payload?: any;
}
