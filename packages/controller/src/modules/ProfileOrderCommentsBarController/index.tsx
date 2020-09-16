import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getComments: (
      username: string,
      order: string,
      time: string,
      page: number
    ) => void;
    clearPosts: () => void;
  }) => JSX.Element;
}

export const ProfileOrderCommentsBarController = (props: Props) => {
  const dispatch = useDispatch();

  const getComments = (
    username: string,
    order: string,
    time: string,
    page: number
  ) => {
    dispatch(allActions.getProfileComments(username, order, time, page));
  };

  const clearPosts = () => {
    dispatch(allActions.clearProfilePosts());
  };

  return props.children({ getComments, clearPosts });
};
