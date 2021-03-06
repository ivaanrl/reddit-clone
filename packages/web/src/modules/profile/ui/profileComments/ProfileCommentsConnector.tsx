import React from "react";
import { ProfileCommentsController } from "@reddit-clone/controller";
import ProfileCommentsView from "./ui/ProfileCommentsView";

const ProfileCommentsConnector = () => {
  return (
    <ProfileCommentsController>
      {() => <ProfileCommentsView />}
    </ProfileCommentsController>
  );
};

export default ProfileCommentsConnector;
