import React from "react";
import CommentController from "@reddit-clone/controller/dist/modules/CommentController";
import CommentsView from "./ui/CommentsView";

const CommentsConnector = () => {
  return <CommentController>{() => <CommentsView />}</CommentController>;
};

export default CommentsConnector;
