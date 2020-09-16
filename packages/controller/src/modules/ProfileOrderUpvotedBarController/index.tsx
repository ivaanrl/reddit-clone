import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getUpvoted: (
      username: string,
      order: string,
      time: string,
      page: number
    ) => void;
    clearPosts: () => void;
  }) => JSX.Element;
}

export const ProfileOrderUpvotedBarController = (props: Props) => {
  const dispatch = useDispatch();

  const getUpvoted = (
    username: string,
    order: string,
    time: string,
    page: number
  ) => {
    dispatch(allActions.getProfileUpvotedPosts(username, order, time, page));
  };
  const clearPosts = () => {
    dispatch(allActions.clearProfilePosts());
  };

  return props.children({ getUpvoted, clearPosts });
};
