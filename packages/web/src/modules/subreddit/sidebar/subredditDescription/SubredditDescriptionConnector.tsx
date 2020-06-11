import React from "react";
import SubredditDescriptionView from "./ui/SubredditDescriptionView";
import { SubredditDescriptionController } from "@reddit-clone/controller";

const SubredditDescriptionConnector = () => {
  return (
    <SubredditDescriptionController>
      {() => <SubredditDescriptionView />}
    </SubredditDescriptionController>
  );
};

export default SubredditDescriptionConnector;
