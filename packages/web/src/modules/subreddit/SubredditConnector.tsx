import React from "react";
import { SubredditController } from "@reddit-clone/controller";
import SubredditView from "./ui/SubredditView";

const SubredditConnector = () => {
  return (
    <SubredditController>
      {({ getSubreddit }) => <SubredditView getSubreddit={getSubreddit} />}
    </SubredditController>
  );
};

export default SubredditConnector;
