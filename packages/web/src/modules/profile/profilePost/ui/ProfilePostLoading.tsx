/* eslint-disable jsx-a11y/aria-role */
import React from "react";
import "./ProfilePostLoading.scss";
import Vote from "../../../posts/vote/Vote";

const ProfilePostLoading = () => {
  const mockVotePost = (
    id: string,
    voteValue: number,
    index: number,
    reducer: string
  ) => {};

  return (
    <div className="profile-post-loading-container" role="loading-post">
      <div className="vote-container">
        <Vote
          id=""
          votes={"0"}
          user_vote={0}
          votePost={mockVotePost}
          showCount={false}
          child={false}
          reducer=""
        />
      </div>
      <div className="profile-post-loading-image-container post-loading">
        <div className="profile-post-loading-image post-loading"></div>
      </div>
      <div className="profile-post-info">
        <div className="profile-post-loading-title post-loading"></div>
        <div className="profile-post-loading-small-text post-loading"></div>
        <div className="profile-post-loading-bottom-bar">
          <div className="profile-post-loading-bottom-bar-small post-loading"></div>
          <div className="profile-post-loading-vertical-separator "></div>
          <div className="profile-post-loading-bottom-bar-large post-loading"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostLoading;
