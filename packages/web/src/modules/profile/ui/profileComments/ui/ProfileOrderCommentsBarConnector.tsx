import React from "react";
import { ProfileOrderCommentsBarController } from "@reddit-clone/controller";
import OrderBar from "../../../../../shared/modules/OrderBar/OrderBar";

const ProfileOrderCommentsBarConnector = () => {
  return (
    <ProfileOrderCommentsBarController>
      {({ getComments }) => (
        <OrderBar
          getPostsWithUsername={getComments}
          defaultSort="new"
          reducer="profile"
        />
      )}
    </ProfileOrderCommentsBarController>
  );
};

export default ProfileOrderCommentsBarConnector;
