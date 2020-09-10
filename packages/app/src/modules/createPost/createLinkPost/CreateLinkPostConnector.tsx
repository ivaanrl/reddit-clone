import React from "react";
import { CreatePostController } from "@reddit-clone/controller";
import CreateLinkPostView from "./ui/CreateLinkPostView";

const CreateLinkPostConnector = () => {
  return (
    <CreatePostController>
      {({ createPost }) => <CreateLinkPostView createPost={createPost} />}
    </CreatePostController>
  );
};

export default CreateLinkPostConnector;
