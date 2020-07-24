import React, { useEffect, useState } from "react";
import { CreatePostController, allActions } from "@reddit-clone/controller";
import CreatePostView from "./ui/CreatePostView";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import SubredditSidebarConnector from "../subreddit/sidebar/SubredditSidebarConnector";
import SidebarConnector from "../homepage/sidebar/SidebarConnector";

const CreatePostConnector = () => {
  const { pathname } = useHistory().location;
  const dispatch = useDispatch();

  const [sidebar, setSidebar] = useState<JSX.Element>(<SidebarConnector />);

  useEffect(() => {
    if (pathname.split("/").includes("r")) {
      dispatch(allActions.getSubreddit(pathname.split("/")[2], "", "", 0));
      setSidebar(<SubredditSidebarConnector />);
    } else {
      setSidebar(<SidebarConnector />);
    }
  }, [pathname, dispatch]);

  return (
    <div className="main-container">
      <CreatePostController>
        {({ createPost }) => <CreatePostView createPost={createPost} />}
      </CreatePostController>
      <div className="div" style={{ marginTop: "60px" }}>
        {sidebar}
      </div>
    </div>
  );
};

export default CreatePostConnector;
