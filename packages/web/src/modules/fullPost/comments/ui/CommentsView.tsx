import React from "react";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import CommentView from "../comment/ui/CommentView";
import CommentConnector from "../comment/CommentConnector";
import { Comment } from "@reddit-clone/controller/dist/modules/Redux/reducers/post";

const CommentsView = () => {
  const postComments = useSelector((state: State) => state.fullPost);

  return (
    <React.Fragment>
      {postComments.comments.map((comment: Comment, index: number) => {
        return (
          <CommentConnector
            commentInfo={comment}
            index={index}
            key={comment.id}
          />
        );
      })}
    </React.Fragment>
  );
};

export default CommentsView;
