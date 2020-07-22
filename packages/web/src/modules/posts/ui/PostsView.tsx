import React from "react";
import "./Posts.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import PostConnector from "../post/PostConnector";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

const PostsView = () => {
  const location = useLocation().pathname.split("/");
  const subreddit = useSelector((state: State) => state.subreddit);
  const homepage = useSelector((state: State) => state.homepage);
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => console.log("a")}
      hasMore={true}
    >
      <div className="posts-container" title="posts">
        {subreddit.posts && location.length > 1 ? (
          subreddit.posts.map((post, index) => {
            return (
              <PostConnector
                key={index}
                postInfo={{ ...post, index }}
                showSubredditName={false}
                reducer="subreddit"
              />
            );
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
              return (
                <PostConnector
                  key={index}
                  postInfo={{ ...post, index }}
                  showSubredditName={true}
                  reducer="homepage"
                />
              );
            })
          : null}
      </div>
    </InfiniteScroll>
  );
};

export default PostsView;
