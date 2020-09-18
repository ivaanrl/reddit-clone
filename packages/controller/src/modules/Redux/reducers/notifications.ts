import { BaseAction, ActionTypes } from "../actions";
import { vote } from "./helpers/vote";
import { Post } from "./subreddit";
import { Comment } from "./post";

export interface Notification {
  originalPost: Post | Comment;
  reply: Comment;
  id: string;
  author_id: string;
  subreddit_name: string;
  user_id: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export type notificationsReducerState = {
  notifications: Notification[];
};

export const notificationsReducer = (
  state: notificationsReducerState = {
    notifications: [],
  },
  action: BaseAction
) => {
  const stateCopy = { ...state };
  switch (action.type) {
    case ActionTypes.GET_NOTIFICATIONS_COMPLETED:
      return { ...state, ...{ notifications: action.payload } };
    default:
      return state;
  }
};
