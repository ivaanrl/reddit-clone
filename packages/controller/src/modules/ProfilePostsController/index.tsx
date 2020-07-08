import { useDispatch } from "react-redux";
import { allActions } from "../..";

interface Props {
  children: (data: {
    getProfilePosts: (username: string) => void;
  }) => JSX.Element;
}

export const ProfilePostsController = (props: Props) => {
  const dispatch = useDispatch();
  const getProfilePosts = (username: string) => {
    dispatch(allActions.getProfilePosts(username));
  };

  return props.children({ getProfilePosts });
};
