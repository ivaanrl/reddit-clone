import { Notification } from "../interfaces/notification";

export type notificationsReducerState = {
  notifications: Notification[];
  message: {
    status: number;
    text: string;
  };
};
