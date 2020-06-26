import React from "react";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import CommentView from "../comment/ui/CommentView";
import CommentConnector from "../comment/CommentConnector";
import { Comment } from "@reddit-clone/controller/dist/modules/Redux/reducers/post";

const CommentsView = () => {
  const postComments = useSelector((state: State) => state.fullPost.comments);

  console.log(postComments);
  return (
    <React.Fragment>
      {postComments.map((comment: Comment, index: number) => {
        return (
          <CommentConnector commentInfo={comment} index={index} key={index} />
        );
      })}
    </React.Fragment>
  );
};

export default CommentsView;
