import React from "react";
import { CreatePostController } from "@reddit-clone/controller";
import CreatePostView from "./ui/CreatePostView";

const CreatePostConnector = () => {
  return (
    <CreatePostController>{() => <CreatePostView />}</CreatePostController>
  );
};

export default CreatePostConnector;
