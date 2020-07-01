import React from "react";
import { useDispatch } from "react-redux";
import { sanitizeContent } from "../../shared/sanitizePostHTML";
import { formatDate } from "../../shared/formatDate";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    sanitizeContent: (content: string[]) => { __html: string };
    formatDate: (date: string) => string;
    vote: (id: string, voteValue: number) => void;
    comment: (postId: string, content: string[]) => void;
  }) => JSX.Element;
}

const CommentController = (props: Props) => {
  const dispatch = useDispatch();

  const vote = (value: string, id: number) => {
    //dispatch(allActions.voteFullPost({ postId: id, voteValue: value }));
  };

  const comment = (commentId: string, content: string[]) => {
    dispatch(allActions.replyComment({ commentId, content }));
  };

  return props.children({ vote, sanitizeContent, formatDate, comment });
};

export default CommentController;
