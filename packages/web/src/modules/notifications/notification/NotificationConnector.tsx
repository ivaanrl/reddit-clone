import { NotificationController } from "@reddit-clone/controller";
import { Notification } from "@reddit-clone/controller/dist/modules/Redux/reducers/notifications";
import React from "react";
import NotificationView from "./ui/NotificationView";

const NotificationConnector = (notificationInfo: Notification) => {
  return (
    <NotificationController>
      {() => <NotificationView notificationInfo={notificationInfo} />}
    </NotificationController>
  );
};

export default NotificationConnector;
