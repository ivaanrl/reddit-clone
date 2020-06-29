import React from "react";
import { useDispatch } from "react-redux";
import { sanitizeContent } from "../../shared/sanitizePostHTML";
import { formatDate } from "../../shared/formatDate";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    sanitizeContent: (content: string[]) => { __html: string };
    formatDate: (date: string) => string;
    vote: (id: number, voteValue: number) => void;
    comment: (postId: number, content: string[]) => void;
  }) => JSX.Element;
}

const CommentController = (props: Props) => {
  const dispatch = useDispatch();

  const vote = (value: number, id: number) => {
    //dispatch(allActions.voteFullPost({ postId: id, voteValue: value }));
  };

  const comment = (commentId: number, content: string[]) => {
    dispatch(allActions.replyComment({ commentId, content }));
  };

  return props.children({ vote, sanitizeContent, formatDate, comment });
};

export default CommentController;
