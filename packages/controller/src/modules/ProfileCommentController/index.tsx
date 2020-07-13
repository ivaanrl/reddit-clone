import { formatDate } from "../../shared/formatDate";
import { sanitizeContent } from "../../shared/sanitizePostHTML";
import { allActions } from "../..";
import { useDispatch } from "react-redux";

interface Props {
  children: (data: {
    sanitizeContent: (content: string[]) => { __html: string };
    formatDate: (date: string) => string;
    comment: (commentId: string, content: string[]) => void;
  }) => JSX.Element;
}

export const ProfileCommentController = (props: Props) => {
  const dispatch = useDispatch();

  const comment = (commentId: string, content: string[]) => {
    dispatch(allActions.replyCommentInProfile({ commentId, content }));
  };

  return props.children({
    sanitizeContent,
    formatDate,
    comment,
  });
};
