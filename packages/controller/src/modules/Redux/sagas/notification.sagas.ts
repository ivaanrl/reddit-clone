import { ActionTypes } from "../actions";
import { takeEvery, call, put, takeLeading } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";
import {
  changeNotificationStatusCompletedAction,
  changeNotificationStatusFailed,
  getNotificationsCompletedAction,
  replyCommentInNotificationCompletedAction,
  replyCommentInNotificationFailed,
} from "../actions/notifications";

export function* watchGetNotifications() {
  yield takeEvery(ActionTypes.GET_NOTIFICATIONS, getNotifications);
}

export function* watchReplyCommentInNotification() {
  yield takeEvery(
    ActionTypes.REPLY_COMMENT_IN_NOTIFICATION,
    replyCommentInNotification
  );
}

export function* watchChangeNotificationStatus() {
  yield takeLeading(
    ActionTypes.CHANGE_NOTIFICATION_STATUS,
    changeNotificationStatus
  );
}

export function* changeNotificationStatus(info: {
  type: string;
  payload: { id: string; index: number };
}) {
  try {
    const notificationResponse = yield call(
      changeNotificationStatusRequest,
      info.payload.id
    );
    yield put(changeNotificationStatusCompletedAction(info.payload.index));
  } catch (error) {
    console.log(error.response.body.message);
    yield put(
      changeNotificationStatusFailed({
        message: {
          status: error.response.status,
          text: error.response.body.message,
        },
      })
    );
  }
}

export function* getNotifications(info: { type: string; payload: string }) {
  const notificationsResponse = yield call(
    getNotificationsRequest,
    info.payload
  );
  yield put(getNotificationsCompletedAction(notificationsResponse.body));
}

export function* replyCommentInNotification(commentInfo: {
  type: string;
  payload: { commentId: string; content: string[] };
}) {
  try {
    const replyResponse = yield call(
      replyCommentInNotificationRequest,
      commentInfo.payload
    );
    yield put(
      replyCommentInNotificationCompletedAction({
        status: replyResponse.status,
        text: replyResponse.body.message,
      })
    );
  } catch (error) {
    yield put(
      replyCommentInNotificationFailed({
        status: error.response.status,
        text: error.response.body.message,
      })
    );
  }
}

export const replyCommentInNotificationRequest = (commentInfo: {
  commentId: string;
  content: string[];
}) => {
  let response;

  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/post/replyComment")
      .send(commentInfo);
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const getNotificationsRequest = (filter: string) => {
  let response;

  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "/user/getNotifications/" + filter);
  } catch (error) {
    response = error.response;
  }

  return response;
};

export const changeNotificationStatusRequest = (id: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/user/changeNotificationStatus/")
      .send({ id });
  } catch (error) {
    response = error.response;
  }

  return response;
};
