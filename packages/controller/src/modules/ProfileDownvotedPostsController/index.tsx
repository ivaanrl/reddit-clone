import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: { getDownvotes: (username: string) => void }) => JSX.Element;
}

export const ProfileDowvotedPostsController = (props: Props) => {
  const dispatch = useDispatch();
  const getDownvotes = (username: string) => {
    dispatch(allActions.getProfileDownvotedPosts(username));
  };

  return props.children({ getDownvotes });
};
