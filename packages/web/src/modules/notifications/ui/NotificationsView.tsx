import { State } from "@reddit-clone/controller";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NotificationConnector from "../notification/NotificationConnector";

interface Props {
  getNotifications: (filter: string) => void;
}

const NotificationsView = ({ getNotifications }: Props) => {
  const { notifications } = useSelector((state: State) => state.notifications);

  useEffect(() => {
    getNotifications("unread");
  }, [getNotifications]);

  return (
    <div className="main-container">
      <div className="filter-options-container">
        <div className="filter-option">All</div>
        <div className="filter-option">Unread</div>
      </div>
      {notifications.map((notification, index) => {
        return <NotificationConnector {...notification} key={index} />;
      })}
    </div>
  );
};

export default NotificationsView;
