import React from "react";
import CreatePostNavbarView from "./ui/CreatePostNavbarView";
import { CreatePostNavbarController } from "@reddit-clone/controller";

const CreatesPostNavbarConnector = () => {
  return (
    <CreatePostNavbarController>
      {() => <CreatePostNavbarView />}
    </CreatePostNavbarController>
  );
};

export default CreatesPostNavbarConnector;
