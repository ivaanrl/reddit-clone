import React from "react";
import { ProfileCommentsController } from "@reddit-clone/controller";
import ProfileCommentsView from "./ui/ProfileCommentsView";
import ProfileCommentsOrderBarConnector from "./ui/ProfileCommentsOrderBarConnector";

const ProfileCommentsConnector = () => {
  return (
    <ProfileCommentsController>
      {() => (
        <React.Fragment>
          <ProfileCommentsOrderBarConnector />
          <ProfileCommentsView />
        </React.Fragment>
      )}
    </ProfileCommentsController>
  );
};

export default ProfileCommentsConnector;
