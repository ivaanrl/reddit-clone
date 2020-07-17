import React from "react";
import { ProfileUpvotedPostsController } from "@reddit-clone/controller";
import ProfileUpvotedView from "./ui/ProfileUpvotedView";

const ProfileUpvotedConnector = () => {
  return (
    <ProfileUpvotedPostsController>
      {() => <ProfileUpvotedView />}
    </ProfileUpvotedPostsController>
  );
};

export default ProfileUpvotedConnector;
