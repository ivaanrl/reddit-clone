import { allActions } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { sanitizeContent } from "../../shared/sanitizePostHTML";
import { formatDate } from "../../shared/formatDate";

interface Props {
  children: (data: {
    sanitizeContent: (content: string[] | null) => { __html: string };
    formatDate: (date: string) => string;
    vote: (
      id: string,
      voteValue: number,
      index: number,
      reducer: string
    ) => void;
  }) => JSX.Element;
}

export const PostController = (props: Props) => {
  const dispatch = useDispatch();
  const vote = (id: string, value: number, index: number, reducer: string) => {
    dispatch(
      allActions.votePost({ postId: id, voteValue: value, index, reducer })
    );
  };

  return props.children({ sanitizeContent, formatDate, vote });
};
