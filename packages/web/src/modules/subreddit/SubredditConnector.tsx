import React from "react";
import { SubredditController } from "@reddit-clone/controller";
import SubredditView from "./ui/SubredditView";

const SubredditConnector = () => {
  return (
    <SubredditController>
      {({ joinOrLeaveSubreddit }) => (
        <SubredditView joinOrLeaveSubreddit={joinOrLeaveSubreddit} />
      )}
    </SubredditController>
  );
};

export default SubredditConnector;
