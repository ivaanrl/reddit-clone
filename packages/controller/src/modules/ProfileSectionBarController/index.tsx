import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: { clearReducer: () => void }) => JSX.Element;
}

export const ProfileSectionBarController = (props: Props) => {
  const dispatch = useDispatch();

  const clearReducer = () => {
    dispatch(allActions.clearProfilePosts());
  };

  return props.children({ clearReducer });
};
