import React from "react";
import { ProfilePostController } from "@reddit-clone/controller";
import ProfilePostView from "./ui/ProfilePostView";

const ProfilePostConnector = () => {
  return (
    <ProfilePostController>
      {({ formatDate, vote }) => (
        <ProfilePostView formatDate={formatDate} vote={vote} />
      )}
    </ProfilePostController>
  );
};

export default ProfilePostConnector;
