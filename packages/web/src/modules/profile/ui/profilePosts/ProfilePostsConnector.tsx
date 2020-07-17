import React from "react";
import { ProfilePostsController } from "@reddit-clone/controller";
import ProfilePostsView from "./ui/ProfilePostsView";

const ProfilePostsConnector = () => {
  return (
    <ProfilePostsController>
      {({}) => <ProfilePostsView />}
    </ProfilePostsController>
  );
};

export default ProfilePostsConnector;
