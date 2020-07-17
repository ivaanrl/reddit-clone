import React from "react";
import { ProfileOrderCommentsBarController } from "@reddit-clone/controller";
import OrderBar from "../../../../../shared/modules/OrderBar/OrderBar";

const ProfileOrderCommentsBarConnector = () => {
  return (
    <ProfileOrderCommentsBarController>
      {({ getComments }) => <OrderBar getPosts={getComments} />}
    </ProfileOrderCommentsBarController>
  );
};

export default ProfileOrderCommentsBarConnector;
