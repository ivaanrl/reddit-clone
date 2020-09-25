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
    save: (id: string, reducer: string, index: number) => void;
  }) => JSX.Element;
}

export const PostController = (props: Props) => {
  const dispatch = useDispatch();
  const vote = (id: string, value: number, index: number, reducer: string) => {
    dispatch(
      allActions.votePost({ postId: id, voteValue: value, index, reducer })
    );
  };

  const save = (id: string, reducer: string, index: number) => {
    dispatch(allActions.savePost({ postId: id, reducer, index }));
  };

  return props.children({ sanitizeContent, formatDate, vote, save });
};
