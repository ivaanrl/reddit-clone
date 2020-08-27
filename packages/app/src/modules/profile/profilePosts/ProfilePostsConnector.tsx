import React from "react";
import ProfilePostsView from "./ui/ProfilePostsView";
import { ProfilePostsController } from "@reddit-clone/controller";
import ProfilePostsOrderBarConnector from "./ui/ProfilePostsOrderBarConnector";

const ProfilePostsConnector = () => {
  return (
    <ProfilePostsController>
      {({}) => {
        return (
          <React.Fragment>
            <ProfilePostsOrderBarConnector />
            <ProfilePostsView />
          </React.Fragment>
        );
      }}
    </ProfilePostsController>
  );
};

export default ProfilePostsConnector;
