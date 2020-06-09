import React from "react";
import { CreatePostCommunityController } from "@reddit-clone/controller";
import CreatePostCommunityView from "./ui/CreatePostCommunityView";

const CreatePostCommunityConnector = () => {
  return (
    <CreatePostCommunityController>
      {() => <CreatePostCommunityView />}
    </CreatePostCommunityController>
  );
};

export default CreatePostCommunityConnector;
