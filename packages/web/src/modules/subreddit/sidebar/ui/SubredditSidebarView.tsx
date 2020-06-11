import React from "react";
import SubredditDescriptionConnector from "../subredditDescription/SubredditDescriptionConnector";
import SubredditModeratorsConnector from "../subredditModerators/SubredditModeratorsConnector";
const SubredditSidebarView = () => {
  return (
    <div className="sidebar-container">
      <SubredditDescriptionConnector />
      <SubredditModeratorsConnector />
    </div>
  );
};

export default SubredditSidebarView;
