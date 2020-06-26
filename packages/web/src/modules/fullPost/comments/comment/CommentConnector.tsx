import React from "react";
import CommentController from "@reddit-clone/controller/dist/modules/CommentController";
import CommentView from "./ui/CommentView";
import { Comment } from "@reddit-clone/controller/dist/modules/Redux/reducers/post";

interface Props {
  commentInfo: Comment;
  index: number;
}

const CommentConnector = (props: Props) => {
  const { commentInfo, index } = props;
  return (
    <CommentController>
      {() => <CommentView index={index} commentInfo={commentInfo} />}
    </CommentController>
  );
};

export default CommentConnector;
