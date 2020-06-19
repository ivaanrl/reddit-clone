import React from "react";
import "./Posts.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import PostConnector from "../post/PostConnector";

const PostsView = () => {
  const { posts } = useSelector((state: State) => state.subreddit);
  return (
    <div className="posts-container" title="posts">
      {posts ? (
        posts.map((post) => {
          return <PostConnector postInfo={{ ...post }} />;
        })
      ) : (
        <div>There are no post in this subreddit...Yet</div>
      )}
    </div>
  );
};

export default PostsView;
