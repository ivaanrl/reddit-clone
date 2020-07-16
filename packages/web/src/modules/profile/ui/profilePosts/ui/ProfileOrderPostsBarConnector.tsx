import React from "react";
import { ProfileOrderPostsBarController } from "@reddit-clone/controller";
import OrderBar from "../../../../../shared/modules/OrderBar/OrderBar";

const ProfileOrderPostsBarConnector = () => {
  return (
    <ProfileOrderPostsBarController>
      {({ getPosts }) => <OrderBar getPosts={getPosts} />}
    </ProfileOrderPostsBarController>
  );
};

export default ProfileOrderPostsBarConnector;
