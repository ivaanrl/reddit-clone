import React from "react";
import { SubredditOrderController } from "@reddit-clone/controller";
import OrderBar from "../../../../shared/modules/orderBar/OrderBar";

const SubredditOrderBarConnector = () => {
  return (
    <SubredditOrderController>
      {({ getSubreddit }) => (
        <OrderBar
          getPostsWithUsername={getSubreddit}
          defaultSort="hot"
          reducer="subreddit"
        />
      )}
    </SubredditOrderController>
  );
};

export default SubredditOrderBarConnector;
