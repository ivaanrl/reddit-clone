import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    joinOrLeaveSubreddit: (subName: string) => void;
  }) => JSX.Element;
}

export const SubredditController = (props: Props) => {
  const dispatch = useDispatch();
  const joinOrLeaveSubreddit = (subName: string) => {
    dispatch(allActions.joinOrLeaveSubreddit(subName));
  };

  return props.children({ joinOrLeaveSubreddit });
};
