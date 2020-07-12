import React from "react";
import { ProfileUpvotedPostsController } from "@reddit-clone/controller";
import ProfileUpvotedView from "./ui/ProfileUpvotedView";

const ProfileUpvotedConnector = () => {
  return (
    <ProfileUpvotedPostsController>
      {({ getUpvotes }) => <ProfileUpvotedView getUpvotes={getUpvotes} />}
    </ProfileUpvotedPostsController>
  );
};

export default ProfileUpvotedConnector;
