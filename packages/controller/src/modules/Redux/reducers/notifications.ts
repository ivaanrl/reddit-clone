import { BaseAction, ActionTypes } from "../actions";
import { vote } from "./helpers/vote";

export interface Notification {
  id: string;
  reply_id: string;
  original_id: string;
  author_id: string;
  subreddit_name: string;
  user_id: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  comment_content: string[];
  type: string;
  reply_author_username: string;
  reply_created_at: string;
  post_title: string;
  votes_value: number;
  user_vote: number;
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
