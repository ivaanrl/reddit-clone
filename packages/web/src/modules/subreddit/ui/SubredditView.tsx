import React, { useEffect } from "react";
import "./Subreddit.scss";
import { useSelector, useDispatch } from "react-redux";
import { State, allActions } from "@reddit-clone/controller";
import { useHistory } from "react-router-dom";
import SubredditSidebarConnector from "../sidebar/SubredditSidebarConnector";

const SubredditView = () => {
  const { pathname } = useHistory().location;
  const dispatch = useDispatch();
  const { name } = useSelector((state: State) => state.subreddit);

  useEffect(() => {
    dispatch(allActions.getSubreddit(pathname.split("/")[2]));
  }, [pathname, dispatch]);

  return (
    <React.Fragment>
      <div className="subreddit-header">
        <div className="banner" />
        <div className="header-info-background">
          <div className="header-info-container">
            <div className="subreddit-photo-container">
              <div className="subreddit-photo"></div>
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
              <div className="subreddit-handle">{"r/" + name}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container">
        <div className="homepage-container">
          <div className="mock-post" />
        </div>
        <SubredditSidebarConnector />
      </div>
    </React.Fragment>
  );
};

export default SubredditView;
