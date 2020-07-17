import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getUpvoted: (username: string, order: string, time: string) => void;
  }) => JSX.Element;
}

export const ProfileOrderUpvotedBarController = (props: Props) => {
  const dispatch = useDispatch();

  const getUpvoted = (username: string, order: string, time: string) => {
    dispatch(allActions.getProfileUpvotedPosts(username, order, time));
  };

  return props.children({ getUpvoted });
};
