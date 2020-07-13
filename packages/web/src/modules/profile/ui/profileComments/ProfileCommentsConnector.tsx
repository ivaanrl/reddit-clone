import React from "react";
import { ProfileCommentsController } from "@reddit-clone/controller";
import ProfileCommentsView from "./ui/ProfileCommentsView";

const ProfileCommentsConnector = () => {
  return (
    <ProfileCommentsController>
      {({ getComments }) => <ProfileCommentsView getComments={getComments} />}
    </ProfileCommentsController>
  );
};

export default ProfileCommentsConnector;
