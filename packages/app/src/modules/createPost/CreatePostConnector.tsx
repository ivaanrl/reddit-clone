import React from "react";
import { CreatePostController } from "@reddit-clone/controller";
import CreatePostView from "./ui/CreatePostView";

const CreatePostConnector = () => {
  return (
    <CreatePostController>
      {({ createPost, createImagePost }) => (
        <CreatePostView
          createImagePost={createImagePost}
          createPost={createPost}
        />
      )}
    </CreatePostController>
  );
};

export default CreatePostConnector;
