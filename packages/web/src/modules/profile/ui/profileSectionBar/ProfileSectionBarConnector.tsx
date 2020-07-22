import React from "react";
import { ProfileSectionBarController } from "@reddit-clone/controller";
import ProfileSectionBarView from "./ui/ProfileSectionBarView";

const ProfileSectionBarConnector = () => {
  return (
    <ProfileSectionBarController>
      {({ clearReducer }) => (
        <ProfileSectionBarView clearReducer={clearReducer} />
      )}
    </ProfileSectionBarController>
  );
};

export default ProfileSectionBarConnector;
