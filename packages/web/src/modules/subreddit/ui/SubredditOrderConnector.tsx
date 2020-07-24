import React from "react";
import OrderBar from "../../../shared/modules/OrderBar/OrderBar";
import { SubredditOrderController } from "@reddit-clone/controller";
const SubredditOrderConnector = () => {
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

export default SubredditOrderConnector;
