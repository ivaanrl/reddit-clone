import React from "react";
import ProfileSidebarView from "./ui/ProfileSidebarView";
import { ProfileSidebarController } from "@reddit-clone/controller";

const ProfileSidebarConnector = () => {
  return (
    <ProfileSidebarController>
      {() => <ProfileSidebarView />}
    </ProfileSidebarController>
  );
};

export default ProfileSidebarConnector;
