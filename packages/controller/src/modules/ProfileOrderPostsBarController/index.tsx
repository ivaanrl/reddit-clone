import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getPosts: (
      username: string,
      order: string,
      time: string,
      page: number
    ) => void;
  }) => JSX.Element;
}

export const ProfileOrderPostsBarController = (props: Props) => {
  const dispatch = useDispatch();

  const getPosts = (
    username: string,
    order: string,
    time: string,
    page: number
  ) => {
    dispatch(allActions.getProfilePosts(username, order, time, page));
  };

  return props.children({ getPosts });
};
