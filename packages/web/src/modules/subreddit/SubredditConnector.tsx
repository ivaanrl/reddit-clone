import React from "react";
import { SubredditController, State } from "@reddit-clone/controller";
import SubredditView from "./ui/SubredditView";

const SubredditConnector = () => {
  return <SubredditController>{() => <SubredditView />}</SubredditController>;
};

export default SubredditConnector;
