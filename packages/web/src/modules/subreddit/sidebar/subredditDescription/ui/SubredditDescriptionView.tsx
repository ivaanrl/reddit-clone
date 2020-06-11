import React from "react";
import "./SubredditDescription.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";

const SubredditDescriptionView = () => {
  const { description, joined, adultContent } = useSelector(
    (state: State) => state.subreddit
  );

  return (
    <div className="sub-description-container">
      <div className="sub-description-header">About Community</div>
      <div className="sub-description">{description}</div>
      <div className="member-count">
        <div className="member-quantity">{joined}</div>
        <div className="member-text">Members</div>
      </div>
      <div className="separator" />
      <div className="sub-create-date">24 febrero 2020</div>
      {adultContent ? (
        <div className="sub-nsfw">
          <span className="tag">NSFW</span> Adult Content
        </div>
      ) : null}
      <button className="sidebar-secondary-button">CREATE POST</button>
    </div>
  );
};

export default SubredditDescriptionView;
