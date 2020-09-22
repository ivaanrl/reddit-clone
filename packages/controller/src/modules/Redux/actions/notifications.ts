import { Notification } from "../../../shared/interfaces/notification";
import { ActionTypes } from "./types";

export const getNotifications = (filter: string) => ({
  type: ActionTypes.GET_NOTIFICATIONS,
  payload: filter,
});

export const getNotificationsCompletedAction = (
  notifications: Notification[]
) => ({
  type: ActionTypes.GET_NOTIFICATIONS_COMPLETED,
  payload: notifications,
});
