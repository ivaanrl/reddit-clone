import React, { useEffect } from "react";
import "./Posts.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import PostConnector from "../post/PostConnector";
import { useLocation } from "react-router-dom";

const PostsView = () => {
  const location = useLocation().pathname.split("/");
  const subreddit = useSelector((state: State) => state.subreddit);
  const homepage = useSelector((state: State) => state.homepage);
  return (
    <div className="posts-container" title="posts">
      {subreddit.posts && location.length > 1 ? (
        subreddit.posts.map((post, index) => {
          return <PostConnector key={index} postInfo={{ ...post, index }} />;
        })
      ) : (
        <div>
          {location.length > 1 ? (
            <div>There are no post in this subreddit...Yet</div>
          ) : null}
        </div>
      )}
      {homepage.posts
        ? homepage.posts.map((post, index) => {
            return <PostConnector key={index} postInfo={{ ...post, index }} />;
          })
        : null}
    </div>
  );
};

export default PostsView;
