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

  return props.children({ getSubreddit });
};
