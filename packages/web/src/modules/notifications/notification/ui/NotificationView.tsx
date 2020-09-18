import React from "react";
import { Notification } from "@reddit-clone/controller/dist/modules/Redux/reducers/notifications";

interface Props {
  notificationInfo: Notification;
}

const NotificationView = ({ notificationInfo }: Props) => {
  const {
    originalPost,
    reply,
    read,
    id,
    author_id,
    subreddit_name,
    user_id,
    createdAt,
    updatedAt,
  } = notificationInfo;
  return (
    <div className="main-contianer">
      <div className="original-post-container"></div>
      <div className="reply-container"></div>
    </div>
  );
};

export default NotificationView;
