import React, { useEffect, useState } from "react";
import "./Subreddit.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { useHistory } from "react-router-dom";
import SubredditSidebarConnector from "../sidebar/SubredditSidebarConnector";
import PostsConnector from "../../posts/PostsConnector";

interface Props {
  getSubreddit: (subName: string) => void;
  joinOrLeaveSubreddit: (subName: string) => void;
}

const SubredditView = (props: Props) => {
  const { getSubreddit, joinOrLeaveSubreddit } = props;
  const { pathname } = useHistory().location;
  const { name, isUserJoined } = useSelector((state: State) => state.subreddit);

  const handleJoinOrLeave = () => {
    joinOrLeaveSubreddit(name);
  };

  const [joinButton, setJoinButton] = useState<JSX.Element>(
    <button
      className="sidebar-secondary-button join-leave-button"
      onClick={handleJoinOrLeave}
    >
      JOIN
    </button>
  );

  const handleMouseEnter = () => {
    setJoinButton(
      <button
        className="sidebar-main-button join-leave-button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleJoinOrLeave}
      >
        LEAVE
      </button>
    );
  };

  const handleMouseLeave = () => {
    setJoinButton(
      <button
        className="sidebar-main-button join-leave-button"
        onMouseEnter={handleMouseEnter}
        onClick={handleJoinOrLeave}
      >
        JOINED
      </button>
    );
  };

  useEffect(() => {
    if (isUserJoined) {
      setJoinButton(
        <button
          className="sidebar-main-button join-leave-button"
          onMouseEnter={handleMouseEnter}
          onClick={handleJoinOrLeave}
        >
          JOINED
        </button>
      );
    } else {
      setJoinButton(
        <button
          className="sidebar-secondary-button join-leave-button"
          onClick={handleJoinOrLeave}
        >
          JOIN
        </button>
      );
    }
  }, [isUserJoined, name]);

  useEffect(() => {
    getSubreddit(pathname.split("/")[2]);
  }, [pathname, getSubreddit]);

  return (
    <React.Fragment>
      <div className="subreddit-header">
        <div className="banner" />
        <div className="header-info-background">
          <div className="header-info-container">
            <div className="subreddit-photo-container">
              <div className="subreddit-photo" title="subreddit-photo"></div>
            </div>
            <div className="name-button-handle-container">
              <div className="header-name-button">
                <div className="subreddit-name" title="subreddit-name">
                  {name}
                </div>
                {joinButton}
              </div>
              <div className="subreddit-handle" title="subreddit-handle">
                {"r/" + name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container">
        <div className="homepage-container">
          <PostsConnector />
        </div>
        <SubredditSidebarConnector />
      </div>
    </React.Fragment>
  );
};

export default SubredditView;
