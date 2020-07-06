import React from "react";
import "./SubredditModerators.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { NavLink } from "react-router-dom";

const SubredditModeratorsView = () => {
  const { mods } = useSelector((state: State) => state.subreddit);

  return (
    <div className="sub-sidebar-main-container" title="subreddit-moderators">
      <div className="sub-sidebar-header">Moderators</div>
      {mods
        ? mods.map((mod, index) => {
            return (
              <NavLink
                key={index}
                className="sub-sidebar-mod-link"
                to={`/u/${mod}`}
              >
                u/{mod}
              </NavLink>
            );
          })
        : null}
    </div>
  );
};

export default SubredditModeratorsView;
