import React from "react";
import { CreatePostController } from "@reddit-clone/controller";
import CreateTextPostView from "./ui/CreateTextPostView";

const CreateTextPostConnector = () => {
  return (
    <CreatePostController>
      {({ createPost }) => <CreateTextPostView createPost={createPost} />}
    </CreatePostController>
  );
};

export default CreateTextPostConnector;
