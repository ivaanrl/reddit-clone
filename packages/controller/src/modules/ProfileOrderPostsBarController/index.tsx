import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getPosts: (username: string, order: string) => void;
  }) => JSX.Element;
}

export const ProfileOrderPostsBarController = (props: Props) => {
  const dispatch = useDispatch();

  const getPosts = (username: string, order: string) => {
    dispatch(allActions.getProfilePosts(username, order));
  };

  return props.children({ getPosts });
};
