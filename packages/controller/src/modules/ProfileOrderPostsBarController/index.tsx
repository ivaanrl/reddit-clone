import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getPosts: (username: string, order: string, time: string) => void;
  }) => JSX.Element;
}

export const ProfileOrderPostsBarController = (props: Props) => {
  const dispatch = useDispatch();

  const getPosts = (username: string, order: string, time: string) => {
    dispatch(allActions.getProfilePosts(username, order, time));
  };

  return props.children({ getPosts });
};
