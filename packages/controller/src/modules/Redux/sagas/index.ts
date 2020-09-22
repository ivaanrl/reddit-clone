import { all, fork } from "redux-saga/effects";
import {
  watchUserSingin,
  watchUserSignup,
  watchUserSignout,
} from "./auth.sagas";
import {
  watchCreatePost,
  watchVotePost,
  watchGetFullPost,
  watchVoteFullPost,
  watchCommentFullPost,
  watchReplyComment,
  watchVoteComment,
  watchCreateImagePost,
} from "./post.sagas";
import {
  watchGetSubreddit,
  watchCreateSubreddit,
  watchJoinOrLeaveSubreddit,
  watchClearSubredditPosts,
} from "./subreddit.sagas";

import {
  watchGetProfile,
  watchGetProfileComments,
  watchGetProfileDownvoted,
  watchGetProfileUpvoted,
  watchProfilePosts,
  watchProfileSaved,
  watchReplyCommentInProfile,
} from "./profile.sagas";

import { watchGetSearchPreview } from "./search.sagas";

import {
  watchGetHomepagePosts,
  watchClearHomepagePosts,
} from "./homepage.sagas";

import {
  watchGetNotifications,
  watchChangeNotificationStatus,
  watchReplyCommentInNotification,
} from "./notification.sagas";

export const rootSaga = function* root() {
  yield all([
    fork(watchUserSignup),
    fork(watchUserSingin),
    fork(watchUserSignout),
    fork(watchGetSubreddit),
    fork(watchCreatePost),
    fork(watchCreateSubreddit),
    fork(watchVotePost),
    fork(watchGetFullPost),
    fork(watchVoteFullPost),
    fork(watchCommentFullPost),
    fork(watchReplyComment),
    fork(watchVoteComment),
    fork(watchJoinOrLeaveSubreddit),
    fork(watchGetProfile),
    fork(watchGetProfileComments),
    fork(watchGetProfileDownvoted),
    fork(watchGetProfileUpvoted),
    fork(watchProfilePosts),
    fork(watchProfileSaved),
    fork(watchReplyCommentInProfile),
    fork(watchGetSearchPreview),
    fork(watchGetHomepagePosts),
    fork(watchCreateImagePost),
    fork(watchClearHomepagePosts),
    fork(watchClearSubredditPosts),
    fork(watchGetNotifications),
    fork(watchChangeNotificationStatus),
    fork(watchReplyCommentInNotification),
  ]);
};
