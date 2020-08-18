import React from "react";
import { HomepageOrderController } from "@reddit-clone/controller";
import OrderBar from "../../../shared/modules/orderBar/OrderBar";

const HomepageOrderBarConnector = () => {
  return (
    <HomepageOrderController>
      {({ getPosts }) => (
        <OrderBar
          getPostsHomepage={getPosts}
          defaultSort="hot"
          reducer="homepage"
        />
      )}
    </HomepageOrderController>
  );
};

export default HomepageOrderBarConnector;
