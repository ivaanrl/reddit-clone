import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: { getSubreddit: (subName: string) => void }) => JSX.Element;
}

export const SubredditController = (props: Props) => {
  const dispatch = useDispatch();
  const getSubreddit = (subName: string) => {
    dispatch(allActions.getSubreddit(subName));
  };

  return props.children({ getSubreddit });
};
