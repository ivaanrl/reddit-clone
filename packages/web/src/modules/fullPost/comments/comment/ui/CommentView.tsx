import React from "react";
import { Comment } from "@reddit-clone/controller/dist/modules/Redux/reducers/post";

interface Props {
  commentInfo: Comment;
  index: number;
}

const CommentView = (props: Props) => {
  const { commentInfo, index } = props;
  const {
    id,
    author_id,
    content,
    post_id,
    comment_id,
    createdAt,
    updatedAt,
  } = commentInfo;
  return <div></div>;
};

export default CommentView;
