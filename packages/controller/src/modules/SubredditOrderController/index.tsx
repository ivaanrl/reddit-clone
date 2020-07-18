import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getSubreddit: (subName: string, order: string, time: string) => void;
  }) => JSX.Element;
}

export const SubredditOrderController = (props: Props) => {
  const dispatch = useDispatch();

  const getSubreddit = (subName: string, order: string, time: string) => {
    dispatch(allActions.getSubreddit(subName, order, time));
  };

  return props.children({ getSubreddit });
};
