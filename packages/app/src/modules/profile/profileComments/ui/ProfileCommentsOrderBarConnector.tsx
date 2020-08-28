import React from "react";
import OrderBar from "../../../../shared/modules/orderBar/OrderBar";
import { ProfileOrderCommentsBarController } from "@reddit-clone/controller";

const ProfileCommentsOrderBarConnector = () => {
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

export default ProfileCommentsOrderBarConnector;
