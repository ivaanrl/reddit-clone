import React, { useState } from "react";
import "./CreatePostCommunity.scss";
import CreateCommunityConnector from "../createCommunity/CreateCommunityConnector";

const CreatePostCommunityView = () => {
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);

  const handleOpenCraeteCommunityForm = () => {
    setShowCreateCommunity(true);
  };

  const handleCloseCreateCommunityForm = () => {
    setShowCreateCommunity(false);
  };

  return (
    <React.Fragment>
      <div className="create-container">
        <div className="create-container-banner" />
        <div className="home-container">
          <div className="create-snoo"></div>
          <span>Home</span>
        </div>
        <div className="create-post-community-description">
          Your personal Reddit frontpage. Come here to check in with your
          favorite communities.
        </div>
        <button className="sidebar-secondary-button create-post-button">
          CREATE POST
        </button>
        <button
          className="sidebar-main-button create-community-button"
          onClick={handleOpenCraeteCommunityForm}
        >
          CREATE COMMUNITY
        </button>
      </div>
      {showCreateCommunity ? (
        <CreateCommunityConnector closeForm={handleCloseCreateCommunityForm} />
      ) : null}
    </React.Fragment>
  );
};

export default CreatePostCommunityView;
