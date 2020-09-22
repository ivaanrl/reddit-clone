import React from "react";
import { CommentsController } from "@reddit-clone/controller";
import CommentsView from "./ui/CommentsView";

const CommentsConnector = () => {
  return <CommentsController>{() => <CommentsView />}</CommentsController>;
};

export default CommentsConnector;
