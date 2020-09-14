import React from "react";
import OrderBar from "../../../../shared/modules/orderBar/OrderBar";
import { ProfileOrderPostsBarController } from "@reddit-clone/controller";

const ProfilePostsOrderBarConnector = () => {
  return (
    <ProfileOrderPostsBarController>
      {({ getPosts, clearPosts }) => (
        <OrderBar
          getPostsWithUsername={getPosts}
          clearPosts={clearPosts}
          defaultSort="new"
          reducer="profile"
        />
      )}
    </ProfileOrderPostsBarController>
  );
};

export default ProfilePostsOrderBarConnector;
