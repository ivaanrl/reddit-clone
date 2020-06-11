import React from "react";
import "./SubredditModerators.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { NavLink } from "react-router-dom";

const SubredditModeratorsView = () => {
  const { mods } = useSelector((state: State) => state.subreddit);

  return (
    <div className="sub-sidebar-main-container">
      <div className="sub-sidebar-header">Moderators</div>
      {mods.map((mod) => {
        return (
          <NavLink className="sub-sidebar-mod-link" to={`/u/${mod}`}>
            u/{mod}
          </NavLink>
        );
      })}
    </div>
  );
};

export default SubredditModeratorsView;
