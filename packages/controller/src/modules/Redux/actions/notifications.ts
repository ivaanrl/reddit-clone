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

export const replyCommentInNotification = (commentInfo: {
  commentId: string;
  content: string[];
}) => ({
  type: ActionTypes.REPLY_COMMENT_IN_NOTIFICATION,
  payload: commentInfo,
});

export const replyCommentInNotificationCompletedAction = (success: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.REPLY_COMMENT_IN_NOTIFICATION_COMPLETED,
  payload: success,
});

export const replyCommentInNotificationFailed = (error: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.REPLY_COMMENT_IN_NOTIFICATION_FAILED,
  payload: error,
});
