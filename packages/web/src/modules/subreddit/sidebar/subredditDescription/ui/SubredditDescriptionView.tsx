import React from "react";
import "./SubredditDescription.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";

const SubredditDescriptionView = () => {
  const { description, joined, adultContent, createdAt } = useSelector(
    (state: State) => state.subreddit
  );

  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const transformDate = () => {
    const date = createdAt.substr(0, 10).split("-");
    return `Created ${monthArray[parseInt(date[1], 10)]} ${date[2]}, ${
      date[0]
    } `;
  };

  return (
    <div className="sub-sidebar-main-container">
      <div className="sub-sidebar-header">About Community</div>
      <div className="sub-description">{description}</div>
      <div className="member-count">
        <div className="member-quantity">{joined}</div>
        <div className="member-text">Members</div>
      </div>
      <div className="separator" />
      <div className="sub-create-date">{transformDate()}</div>
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