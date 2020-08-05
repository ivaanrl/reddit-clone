import React from "react";
import "./Posts.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import PostConnector from "../post/PostConnector";
import { useLocation } from "react-router-dom";
import PostLoading from "../post/ui/PostLoading";

const PostsView = () => {
  const location = useLocation().pathname.split("/");
  const subreddit = useSelector((state: State) => state.subreddit);
  const homepage = useSelector((state: State) => state.homepage);
  return (
    <div className="posts-container" title="posts">
      {subreddit.posts && location.length >= 3 ? (
        <React.Fragment>
          {subreddit.posts.map((post, index) => {
            return (
              <PostConnector
                key={index}
                postInfo={{ ...post, index }}
                showSubredditName={false}
                reducer="subreddit"
              />
            );
          })}
          {subreddit.isLoading &&
          subreddit.hasMorePosts &&
          location.length >= 3 ? (
            <PostLoading />
          ) : null}
        </React.Fragment>
      ) : (
        <div>
          {location.length >= 3 ? (
            <div>There are no post in this subreddit...Yet</div>
          ) : null}
        </div>
      )}

      {homepage.posts && location.length <= 2 ? (
        <React.Fragment>
          {homepage.posts.map((post, index) => {
            return (
              <PostConnector
                key={index}
                postInfo={{ ...post, index }}
                showSubredditName={true}
                reducer="homepage"
              />
            );
          })}
          {homepage.isLoading && homepage.hasMorePosts ? <PostLoading /> : null}
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default PostsView;
