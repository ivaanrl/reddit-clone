import React from "react";
import OrderBar from "../../../shared/modules/OrderBar/OrderBar";
import { SubredditOrderController } from "@reddit-clone/controller";
const SubredditOrderConnector = () => {
  return (
    <SubredditOrderController>
      {({ getSubreddit, clearPosts }) => (
        <OrderBar
          getPostsWithUsername={getSubreddit}
          defaultSort="hot"
          reducer="subreddit"
          clearPosts={clearPosts}
        />
      )}
    </SubredditOrderController>
  );
};

export default SubredditOrderConnector;
