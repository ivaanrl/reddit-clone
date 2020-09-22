import { notificationsReducerState } from "../../../shared/types/notifications";
import { BaseAction, ActionTypes } from "../actions";
import { vote } from "./helpers/vote";

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
    case ActionTypes.CHANGE_NOTIFICATION_STATUS_COMPLETED:
      const index = action.payload;
      stateCopy.notifications[index].read = !stateCopy.notifications[index]
        .read;
      return { ...state, ...stateCopy };
    default:
      return state;
  }
};
