import React from "react";
import { ProfileDowvotedPostsController } from "@reddit-clone/controller";
import ProfileDownvotedView from "./ui/ProfileDownvotedView";

const ProfileDownvotedConnector = () => {
  return (
    <ProfileDowvotedPostsController>
      {() => <ProfileDownvotedView />}
    </ProfileDowvotedPostsController>
  );
};

export default ProfileDownvotedConnector;
