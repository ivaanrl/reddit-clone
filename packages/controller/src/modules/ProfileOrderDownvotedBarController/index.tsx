import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getDownvoted: (username: string, order: string, time: string) => void;
  }) => JSX.Element;
}

export const ProfileOrderDownvotedBarController = (props: Props) => {
  const dispatch = useDispatch();

  const getDownvoted = (username: string, order: string, time: string) => {
    dispatch(allActions.getProfileDownvotedPosts(username, order, time));
  };

  return props.children({ getDownvoted });
};
