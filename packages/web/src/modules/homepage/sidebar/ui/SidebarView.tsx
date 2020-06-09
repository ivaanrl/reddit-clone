import React from "react";
import CreatePostCommunityConnector from "../createPostCommunity/CreatePostCommunityConnector";
import "./Sidebar.scss";

const SidebarView = () => {
  return (
    <div className="sidebar-container">
      <CreatePostCommunityConnector />
    </div>
  );
};

export default SidebarView;
