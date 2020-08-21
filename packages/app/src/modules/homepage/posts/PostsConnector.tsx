import React from "react";
import { PostsController } from "@reddit-clone/controller";
import PostsView from "./ui/PostsView";

const PostsConnector = () => {
  return <PostsController>{() => <PostsView />}</PostsController>;
};

export default PostsConnector;
