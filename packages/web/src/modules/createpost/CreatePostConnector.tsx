import React, { useEffect, useState } from "react";
import {
  CreatePostController,
  State,
  allActions,
} from "@reddit-clone/controller";
import CreatePostView from "./ui/CreatePostView";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SubredditSidebarConnector from "../subreddit/sidebar/SubredditSidebarConnector";
import SidebarConnector from "../homepage/sidebar/SidebarConnector";

const CreatePostConnector = () => {
  const { pathname } = useHistory().location;
  const dispatch = useDispatch();
  const { name } = useSelector((state: State) => state.subreddit);

  const [sidebar, setSidebar] = useState<JSX.Element>(<SidebarConnector />);

  useEffect(() => {
    if (pathname.split("/").includes("r")) {
      dispatch(allActions.getSubreddit(pathname.split("/")[2]));
      setSidebar(<SubredditSidebarConnector />);
    } else {
      setSidebar(<SidebarConnector />);
    }
  }, [pathname, dispatch]);

  return (
    <div className="main-container">
      <CreatePostController>{() => <CreatePostView />}</CreatePostController>
      <div className="div" style={{ marginTop: "60px" }}>
        {sidebar}
      </div>
    </div>
  );
};

export default CreatePostConnector;
