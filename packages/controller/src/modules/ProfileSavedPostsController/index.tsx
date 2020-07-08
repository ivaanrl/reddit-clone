import { useDispatch } from "react-redux";
import { allActions } from "../..";

interface Props {
  children: (data: {
    getSavedPosts: (username: string) => void;
  }) => JSX.Element;
}

export const ProfileSavedPostsController = (props: Props) => {
  const dispatch = useDispatch();
  const getSavedPosts = (username: string) => {
    dispatch(allActions.getProfileSavedPosts(username));
  };

  return props.children({ getSavedPosts });
};
