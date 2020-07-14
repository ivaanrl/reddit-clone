import React, { useEffect } from "react";
import "./Homepage.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import PostsConnector from "../../posts/PostsConnector";

interface Props {
  getPosts: () => void;
}

const HomepageView = (props: Props) => {
  const { getPosts } = props;

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="homepage-container">
      <PostsConnector />
    </div>
  );
};

export default HomepageView;
