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
  voteCount: string;
  userVote: number;
  index: number;
  createdAt: string;
  formatDate: (date: string) => string;
  vote: (id: string, voteValue: number, index: number, reducer: string) => void;
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
          reducer="profile"
        />
      </div>
      <div className="profile-post-image-container">
        <div className="profile-post-image"></div>
      </div>
      <div className="profile-post-info">
        <NavLink
          to={`/r/${subredditName}/post/${id}`}
          className="profile-post-title"
        >
          {title}
        </NavLink>
        <div className="profile-post-small-text">
          <NavLink
            to={`/r/${subredditName}`}
            className="profile-post-subreddit-name"
          >
            r/{subredditName}
          </NavLink>
          &nbsp;
          <div className="profile-post-posted-by">
            Posted by u/{profileInfo.username} {formatDate(createdAt)}
          </div>
        </div>
        <div className="bottom-bar"></div>
      </div>
    </div>
  );
};

export default ProfilePostView;
