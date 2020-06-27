import React from "react";
import { useDispatch } from "react-redux";
import { sanitizeContent } from "../../shared/sanitizePostHTML";
import { formatDate } from "../../shared/formatDate";

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

  const comment = (postId: number, content: string[]) => {
    //dispatch(allActions.commentFullPost({ postId, content }));
  };

  return props.children({ vote, sanitizeContent, formatDate, comment });
};

export default CommentController;
