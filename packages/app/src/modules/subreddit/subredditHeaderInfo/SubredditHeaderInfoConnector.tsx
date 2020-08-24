import React from "react";
import { SubredditController } from "@reddit-clone/controller";
import SubredditHeaderInfoView from "./ui/SubredditHeaderInfoView";

const SubredditHeaderInfoConnector = () => {
  return (
    <SubredditController>
      {({ joinOrLeaveSubreddit }) => (
        <SubredditHeaderInfoView joinOrLeaveSubreddit={joinOrLeaveSubreddit} />
      )}
    </SubredditController>
  );
};

export default SubredditHeaderInfoConnector;
