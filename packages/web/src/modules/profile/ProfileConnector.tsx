import React from "react";
import { ProfileController } from "@reddit-clone/controller";
import ProfileView from "./ui/ProfileView";

const ProfileConnector = () => {
  return (
    <ProfileController>
      {({ getProfile }) => <ProfileView getProfile={getProfile} />}
    </ProfileController>
  );
};

export default ProfileConnector;
