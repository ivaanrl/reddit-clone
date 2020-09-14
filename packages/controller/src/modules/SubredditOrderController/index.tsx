import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getSubreddit: (
      subName: string,
      order: string,
      time: string,
      page: number
    ) => void;
    clearPosts: () => void;
  }) => JSX.Element;
}

export const SubredditOrderController = (props: Props) => {
  const dispatch = useDispatch();

  const getSubreddit = (
    subName: string,
    order: string,
    time: string,
    page: number
  ) => {
    dispatch(allActions.getSubreddit(subName, order, time, page));
  };

  const clearPosts = () => {
    dispatch(allActions.clearSubredditPosts());
  };

  return props.children({ getSubreddit, clearPosts });
};
