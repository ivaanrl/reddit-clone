import React from "react";
import OrderBar from "../../../shared/modules/OrderBar/OrderBar";
import { HomepageOrderController } from "@reddit-clone/controller";

const HomepageOrderBarConnector = () => {
  return (
    <HomepageOrderController>
      {({ getPosts, clearPosts }) => (
        <OrderBar
          getPostsHomepage={getPosts}
          defaultSort="hot"
          reducer="homepage"
          clearPosts={clearPosts}
        />
      )}
    </HomepageOrderController>
  );
};

export default HomepageOrderBarConnector;
