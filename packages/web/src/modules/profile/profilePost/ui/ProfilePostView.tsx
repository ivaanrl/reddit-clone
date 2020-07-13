import React from "react";
import "./ProfilePost.scss";
import Vote from "../../../posts/vote/Vote";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { NavLink } from "react-router-dom";

interface Props {
  id: string;
  subredditName: string;
  title: string;
  voteCount: number;
  userVote: number;
  index: number;
  createdAt: string;
  formatDate: (date: string) => string;
  vote: (id: string, voteValue: number, index: number) => void;
}

const ProfilePostView = (props: Props) => {
  const profileInfo = useSelector((state: State) => state.profile.userInfo);
  const {
    id,
    subredditName,
    title,
    voteCount,
    userVote,
    index,
    createdAt,
    vote,
    formatDate,
  } = props;

  return (
    <div className="profile-post-container">
      <div className="vote-container">
        <Vote
          id={id}
          index={index}
          votes={voteCount}
          user_vote={userVote}
          votePost={vote}
          showCount={true}
          child={false}
        />
      </div>
      <div className="profile-post-image-container">
        <div className="profile-post-image"></div>
      </div>
      <NavLink
        to={`/r/${subredditName}/post/${id}`}
        className="profile-post-info"
      >
        <div className="profile-post-title">{title}</div>
        <div className="profile-post-small-text">
          <div className="profile-post-subreddit-name">r/{subredditName}</div>
          &nbsp;
          <div className="profile-post-posted-by">
            Posted by u/{profileInfo.username} {formatDate(createdAt)}
          </div>
        </div>
        <div className="bottom-bar"></div>
      </NavLink>
    </div>
  );
};

export default ProfilePostView;