import React from "react";
import "./Homepage.scss";
import PostsConnector from "../../posts/PostsConnector";
import HomepageOrderBarConnector from "./HomepageOrderBarConnector";

const HomepageView = () => {
  return (
    <div className="homepage-container">
      <HomepageOrderBarConnector />
      <PostsConnector />
    </div>
  );
};

export default HomepageView;
