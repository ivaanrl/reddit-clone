import React from "react";
import SubredditHeaderView from "./ui/SubredditHeaderView";
import { SubredditController } from "@reddit-clone/controller";

const SubredditHeaderConnector = () => {
  return (
    <SubredditController>
      {({ joinOrLeaveSubreddit }) => (
        <SubredditHeaderView joinOrLeaveSubreddit={joinOrLeaveSubreddit} />
      )}
    </SubredditController>
  );
};

export default SubredditHeaderConnector;
