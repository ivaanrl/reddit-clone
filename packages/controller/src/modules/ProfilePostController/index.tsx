import { formatDate } from "../../shared/formatDate";
import { useDispatch } from "react-redux";
import { allActions } from "../Redux/actions";

interface Props {
  children: (data: {
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

export const ProfilePostController = (props: Props) => {
  const dispatch = useDispatch();
  const vote = (id: string, value: number, index: number, reducer: string) => {
    dispatch(
      allActions.votePost({ postId: id, voteValue: value, index, reducer })
    );
  };

  const save = (id: string, reducer: string, index: number) => {
    dispatch(allActions.savePost({ postId: id, reducer, index }));
  };

  return props.children({ formatDate, vote, save });
};
