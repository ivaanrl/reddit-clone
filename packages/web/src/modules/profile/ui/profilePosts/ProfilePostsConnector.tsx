import React from "react";
import { ProfilePostsController } from "@reddit-clone/controller";
import ProfilePostsView from "./ui/ProfilePostsView";

const ProfilePostsConnector = () => {
  return (
    <ProfilePostsController>
      {({ getProfilePosts }) => (
        <ProfilePostsView getProfilePosts={getProfilePosts} />
      )}
    </ProfilePostsController>
  );
};

export default ProfilePostsConnector;
