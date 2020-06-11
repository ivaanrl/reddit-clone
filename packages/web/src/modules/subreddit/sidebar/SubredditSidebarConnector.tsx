import React from "react";
import { SidebarController } from "@reddit-clone/controller";
import SubredditSidebarView from "./ui/SubredditSidebarView";

const SubredditSidebarConnector = () => {
  return (
    <SidebarController>{() => <SubredditSidebarView />}</SidebarController>
  );
};

export default SubredditSidebarConnector;
