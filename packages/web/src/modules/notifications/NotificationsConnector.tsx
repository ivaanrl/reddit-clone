import React from "react";
import { NotificationsController } from "@reddit-clone/controller";
import NotificationsView from "./ui/NotificationsView";

const NotificationsConnector = () => {
  return (
    <NotificationsController>
      {({ getNotifications }) => (
        <NotificationsView getNotifications={getNotifications} />
      )}
    </NotificationsController>
  );
};

export default NotificationsConnector;
