import React from "react";
import { ProfileOrderPostsBarController } from "@reddit-clone/controller";
import OrderBar from "../../../../../shared/modules/OrderBar/OrderBar";

const ProfileOrderPostsBarConnector = () => {
  return (
    <ProfileOrderPostsBarController>
      {({ getPosts, clearPosts }) => (
        <OrderBar
          getPostsWithUsername={getPosts}
          defaultSort="new"
          reducer="profile"
          clearPosts={clearPosts}
        />
      )}
    </ProfileOrderPostsBarController>
  );
};

export default ProfileOrderPostsBarConnector;
