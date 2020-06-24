import { allActions } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { sanitizeContent } from "../../shared/sanitizePostHTML";
import { formatDate } from "../../shared/formatDate";

interface Props {
  children: (data: {
    sanitizeContent: (content: string[]) => { __html: string };
    formatDate: (date: string) => string;
    vote: (id: number, voteValue: number, index: number) => void;
  }) => JSX.Element;
}

export const PostController = (props: Props) => {
  const dispatch = useDispatch();
  const vote = (value: number, id: number, index: number) => {
    dispatch(allActions.votePost({ postId: id, voteValue: value, index }));
  };

  return props.children({ sanitizeContent, formatDate, vote });
};
