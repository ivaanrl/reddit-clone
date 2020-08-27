import React from "react";
import OrderBar from "../../../../shared/modules/orderBar/OrderBar";
import { ProfileOrderPostsBarController } from "@reddit-clone/controller";

const ProfilePostsOrderBarConnector = () => {
  return (
    <ProfileOrderPostsBarController>
      {({ getPosts }) => (
        <OrderBar
          getPostsWithUsername={getPosts}
          defaultSort="new"
          reducer="profile"
        />
      )}
    </ProfileOrderPostsBarController>
  );
};

export default ProfilePostsOrderBarConnector;
