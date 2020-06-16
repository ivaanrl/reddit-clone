import React from "react";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";

const PostsView = () => {
  const { posts } = useSelector((state: State) => state.subreddit);
  return (
    <React.Fragment>
      {posts.map((post) => {
        return "hola";
      })}
    </React.Fragment>
  );
};

export default PostsView;
