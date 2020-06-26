import React from "react";
import CommentsController from "@reddit-clone/controller/dist/modules/CommentsController";
import CommentsView from "./ui/CommentsView";

const CommentsConnector = () => {
  return <CommentsController>{() => <CommentsView />}</CommentsController>;
};

export default CommentsConnector;
