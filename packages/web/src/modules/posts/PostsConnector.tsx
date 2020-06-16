import React from "react";
import PostsView from "./ui/PostsView";
import { PostsController } from "@reddit-clone/controller";

const PostsConnector = () => {
  return <PostsController>{() => <PostsView />}</PostsController>;
};

export default PostsConnector;
