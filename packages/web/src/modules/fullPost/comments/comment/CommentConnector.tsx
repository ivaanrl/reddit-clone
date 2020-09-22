import React from "react";
import CommentView from "./ui/CommentView";
import { Comment, CommentController } from "@reddit-clone/controller";
interface Props {
  commentInfo: Comment;
  index: number;
}

const CommentConnector = (props: Props) => {
  const { commentInfo, index } = props;
  return (
    <CommentController>
      {({ sanitizeContent, formatDate, vote, comment }) => (
        <CommentView
          comment={comment}
          vote={vote}
          formatDate={formatDate}
          sanitizeContent={sanitizeContent}
          index={index}
          commentInfo={commentInfo}
          child={false}
          depth={0}
        />
      )}
    </CommentController>
  );
};

export default CommentConnector;
