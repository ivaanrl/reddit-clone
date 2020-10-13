import React from "react";
import { useDispatch } from "react-redux";
import { sanitizeContent } from "../../shared/sanitizePostHTML";
import { formatDate } from "../../shared/formatDate";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    sanitizeContent: (content: string[]) => { __html: string };
    formatDate: (date: string) => string;
    vote: (path: string[], voteValue: number) => void;
    comment: (postId: string, content: string[]) => void;
    deleteComment: (path: string[], commentId: string) => void;
  }) => JSX.Element;
}

export const CommentController = (props: Props) => {
  const dispatch = useDispatch();

  const vote = (path: string[], voteValue: number) => {
    dispatch(allActions.voteComment({ path, voteValue }));
  };

  const comment = (commentId: string, content: string[]) => {
    dispatch(allActions.replyComment({ commentId, content }));
  };

  const deleteComment = (path: string[], commentId: string) => {
    dispatch(allActions.deleteComment(path, commentId));
  };

  return props.children({
    vote,
    sanitizeContent,
    formatDate,
    comment,
    deleteComment,
  });
};
