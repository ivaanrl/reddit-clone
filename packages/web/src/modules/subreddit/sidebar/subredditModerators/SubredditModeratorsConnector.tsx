import React from "react";
import { SubredditModeratorsController } from "@reddit-clone/controller";
import SubredditModeratorsView from "./ui/SubredditModeratorsView";

const SubredditModeratorsConnector = () => {
  return (
    <SubredditModeratorsController>
      {() => <SubredditModeratorsView />}
    </SubredditModeratorsController>
  );
};

export default SubredditModeratorsConnector;
