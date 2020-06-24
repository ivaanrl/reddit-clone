import React, { useEffect } from "react";
import "./Subreddit.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { useHistory } from "react-router-dom";
import SubredditSidebarConnector from "../sidebar/SubredditSidebarConnector";
import PostsConnector from "../../posts/PostsConnector";

interface Props {
  getSubreddit: (subName: string) => void;
}

const SubredditView = (props: Props) => {
  const { getSubreddit } = props;
  const { pathname } = useHistory().location;
  const { name } = useSelector((state: State) => state.subreddit);

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
                <button className="sidebar-main-button join-leave-button">
                  JOINED
                </button>
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
