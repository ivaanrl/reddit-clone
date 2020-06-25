import { useDispatch } from "react-redux";
import { allActions } from "../Redux";
import { sanitizeContent } from "../../shared/sanitizePostHTML";
import { formatDate } from "../../shared/formatDate";

interface Props {
  children: (data: {
    getFullPost: (postId: number) => void;
    sanitizeContent: (content: string[]) => { __html: string };
    formatDate: (date: string) => string;
    vote: (id: number, voteValue: number) => void;
    comment: (postId: number, content: string[]) => void;
  }) => JSX.Element;
}

export const FullPostController = (props: Props) => {
  const dispatch = useDispatch();
  const getFullPost = (postId: number) => {
    dispatch(allActions.getFullPost(postId));
  };

  const vote = (value: number, id: number) => {
    dispatch(allActions.voteFullPost({ postId: id, voteValue: value }));
  };

  const comment = (postId: number, content: string[]) => {
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
