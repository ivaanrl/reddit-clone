import { formatDate } from "../../shared/formatDate";
import { useDispatch } from "react-redux";
import { allActions } from "../..";

interface Props {
  children: (data: {
    formatDate: (date: string) => string;
    vote: (
      id: string,
      voteValue: number,
      index: number,
      reducer: string
    ) => void;
  }) => JSX.Element;
}

export const ProfilePostController = (props: Props) => {
  const dispatch = useDispatch();
  const vote = (id: string, value: number, index: number, reducer: string) => {
    dispatch(
      allActions.votePost({ postId: id, voteValue: value, index, reducer })
    );
  };

  return props.children({ formatDate, vote });
};
