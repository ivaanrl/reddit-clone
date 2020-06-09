import React from "react";
import { HomepageController } from "@reddit-clone/controller";
import HomepageView from "./ui/HomepageView";
import SidebarConnector from "./sidebar/SidebarConnector";
import "./HomepageConnector.scss";

const HomepageConnector = () => {
  return (
    <div className="main-container">
      <HomepageController>
        {({ getPosts }) => <HomepageView getPosts={getPosts} />}
      </HomepageController>
      <SidebarConnector />
    </div>
  );
};

export default HomepageConnector;
