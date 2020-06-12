import React from "react";
import { CreatePostController } from "@reddit-clone/controller";
import CreatePostView from "./ui/CreatePostView";
//import SidebarConnector from "../homepage/sidebar/SidebarConnector";

const CreatePostConnector = () => {
  return (
    <div className="main-container">
      <CreatePostController>{() => <CreatePostView />}</CreatePostController>
    </div>
  );
};

export default CreatePostConnector;
