import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {}) => JSX.Element;
}

export const ProfileDowvotedPostsController = (props: Props) => {
  return props.children({});
};
