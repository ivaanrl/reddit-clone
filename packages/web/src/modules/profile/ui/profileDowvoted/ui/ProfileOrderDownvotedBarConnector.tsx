import React from "react";
import { ProfileOrderDownvotedBarController } from "@reddit-clone/controller";
import OrderBar from "../../../../../shared/modules/OrderBar/OrderBar";

const ProfileOrderDownvotedBarConnector = () => {
  return (
    <ProfileOrderDownvotedBarController>
      {({ getDownvoted }) => <OrderBar getPosts={getDownvoted} />}
    </ProfileOrderDownvotedBarController>
  );
};

export default ProfileOrderDownvotedBarConnector;
