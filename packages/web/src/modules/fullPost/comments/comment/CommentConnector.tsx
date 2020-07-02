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
