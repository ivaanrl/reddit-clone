import React from "react";
import CreatePostConnector from "../CreatePostConnector";
import CreateImagePostView from "./ui/CreateImagePostView";
import { CreatePostController } from "@reddit-clone/controller";

const CreateImagePostConnector = () => {
  return (
    <CreatePostController>
      {({ createImagePost }) => (
        <CreateImagePostView createImagePost={createImagePost} />
      )}
    </CreatePostController>
  );
};

export default CreateImagePostConnector;
