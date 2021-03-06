import { NotificationController } from "@reddit-clone/controller";
import { Notification } from "@reddit-clone/controller";
import React from "react";
import NotificationView from "./ui/NotificationView";

interface Props {
  notificationInfo: Notification;
  index: number;
}

const NotificationConnector = ({ notificationInfo, index }: Props) => {
  return (
    <NotificationController>
      {({ sanitizeContent, formatDate, vote, comment, changeReadStatus }) => (
        <NotificationView
          notificationInfo={notificationInfo}
          formatDate={formatDate}
          sanitizeContent={sanitizeContent}
          index={index}
          vote={vote}
          comment={comment}
          changeReadStatus={changeReadStatus}
        />
      )}
    </NotificationController>
  );
};

export default NotificationConnector;
