import { ActionTypes } from "../actions";
import { takeEvery, call, put, takeLeading } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";
import { getNotificationsCompletedAction } from "../actions/notifications";

export function* watchGetNotifications() {
  yield takeEvery(ActionTypes.GET_NOTIFICATIONS, getNotifications);
}

export function* getNotifications(info: { type: string; payload: string }) {
  const notificationsResponse = yield call(
    getNotificationsRequest,
    info.payload
  );
  yield put(getNotificationsCompletedAction(notificationsResponse.body));
}

export const getNotificationsRequest = (filter: string) => {
  let response;

  try {
    response = superagent
      .agent()
      .withCredentials()
      .post(APIUrl + "/auth/getNotifications")
      .send(filter);
  } catch (error) {
    response = error.response;
  }

  return response;
};
