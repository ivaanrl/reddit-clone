import React, { useEffect, useState } from "react";
import "./Notifications.scss";
import { State } from "@reddit-clone/controller";
import { useSelector } from "react-redux";
import NotificationConnector from "../notification/NotificationConnector";
import { NavLink, useLocation } from "react-router-dom";
interface Props {
  getNotifications: (filter: string) => void;
}

const NotificationsView = ({ getNotifications }: Props) => {
  const { notifications } = useSelector((state: State) => state.notifications);
  const location = useLocation();
  const [activeOption, setActiveOption] = useState<string>("unread");

  useEffect(() => {
    getNotifications(activeOption);
    setActiveOption(location.pathname.split("/")[2]);
    console.log(location.pathname.split("/"));
  }, [getNotifications, location, activeOption]);

  return (
    <div className="notifications-main-container">
      <div className="filter-options-container">
        <NavLink
          className={
            activeOption === "all" ? "filter-option-selected" : "filter-option"
          }
          to="/notifications/all"
        >
          All
        </NavLink>
        <NavLink
          className={
            activeOption === "unread"
              ? "filter-option-selected"
              : "filter-option"
          }
          to="/notifications/unread"
        >
          Unread
        </NavLink>
      </div>
      {notifications.map((notification, index) => {
        return (
          <NotificationConnector
            notificationInfo={notification}
            key={index}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default NotificationsView;
