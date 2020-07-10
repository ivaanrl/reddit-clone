import React from "react";
import { ProfileUserDescriptionController } from "@reddit-clone/controller";
import ProfileUserDescriptionView from "./ui/ProfileUserDescriptionView";
const ProfileUserDescriptionConnector = () => {
  return (
    <ProfileUserDescriptionController>
      {() => <ProfileUserDescriptionView />}
    </ProfileUserDescriptionController>
  );
};

export default ProfileUserDescriptionConnector;
