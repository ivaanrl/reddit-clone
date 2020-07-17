import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getComments: (username: string, order: string, time: string) => void;
  }) => JSX.Element;
}

export const ProfileOrderCommentsBarController = (props: Props) => {
  const dispatch = useDispatch();

  const getComments = (username: string, order: string, time: string) => {
    dispatch(allActions.getProfileComments(username, order, time));
  };

  return props.children({ getComments });
};
