import React from "react";
import { HomepageController } from "@reddit-clone/controller";
import HomepageView from "./ui/HomepageView";

const HomepageConnector = () => {
  return (
    <HomepageController>
      {({ getPosts }) => <HomepageView getPosts={getPosts} />}
    </HomepageController>
  );
};

export default HomepageConnector;
