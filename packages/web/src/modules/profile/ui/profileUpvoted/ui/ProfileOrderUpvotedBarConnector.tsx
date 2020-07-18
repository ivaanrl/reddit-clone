import React from "react";
import { ProfileOrderUpvotedBarController } from "@reddit-clone/controller";
import OrderBar from "../../../../../shared/modules/OrderBar/OrderBar";

const ProfileOrderUpvotedBarConnector = () => {
  return (
    <ProfileOrderUpvotedBarController>
      {({ getUpvoted }) => <OrderBar getPostsWithUsername={getUpvoted} />}
    </ProfileOrderUpvotedBarController>
  );
};

export default ProfileOrderUpvotedBarConnector;
