import { useDispatch } from "react-redux";
import { allActions } from "../Redux";
import { sanitizeContent } from "../../shared/sanitizePostHTML";
import { formatDate } from "../../shared/formatDate";

interface Props {
  children: (data: {
    getFullPost: (postId: string) => void;
    sanitizeContent: (content: string[]) => { __html: string };
    formatDate: (date: string) => string;
    vote: (id: string, voteValue: number) => void;
    comment: (postId: string, content: string[]) => void;
  }) => JSX.Element;
}

export const FullPostController = (props: Props) => {
  const dispatch = useDispatch();
  const getFullPost = (postId: string) => {
    dispatch(allActions.getFullPost(postId));
  };

  const vote = (id: string, value: number) => {
    dispatch(allActions.voteFullPost({ postId: id, voteValue: value }));
  };

  const comment = (postId: string, content: string[]) => {
    dispatch(allActions.commentFullPost({ postId, content }));
  };

  return props.children({
    getFullPost,
    vote,
    sanitizeContent,
    formatDate,
    comment,
  });
};
