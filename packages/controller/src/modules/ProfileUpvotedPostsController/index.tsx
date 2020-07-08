import { useDispatch } from "react-redux";
import { allActions } from "../..";

interface Props {
  children: (data: { getUpvotes: (username: string) => void }) => JSX.Element;
}

export const ProfileUpvotedPostsController = (props: Props) => {
  const dispatch = useDispatch();

  const getUpvotes = (username: string) => {
    dispatch(allActions.getProfileUpvotedPosts(username));
  };

  return props.children({ getUpvotes });
};
