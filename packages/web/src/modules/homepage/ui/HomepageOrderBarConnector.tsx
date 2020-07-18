import React from "react";
import OrderBar from "../../../shared/modules/OrderBar/OrderBar";
import { HomepageOrderController } from "@reddit-clone/controller";

const HomepageOrderBarConnector = () => {
  return (
    <HomepageOrderController>
      {({ getPosts }) => (
        <OrderBar getPostsHomepage={getPosts} defaultSort="hot" />
      )}
    </HomepageOrderController>
  );
};

export default HomepageOrderBarConnector;
