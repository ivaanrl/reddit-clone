import { useDispatch } from "react-redux";
import { allActions } from "../..";

interface Props {
  children: (data: { getComments: (username: string) => void }) => JSX.Element;
}

export const ProfileCommentsController = (props: Props) => {
  const dispatch = useDispatch();
  const getComments = (username: string) => {
    dispatch(allActions.getProfileComments(username));
  };

  return props.children({ getComments });
};
