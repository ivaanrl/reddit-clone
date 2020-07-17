import { useDispatch } from "react-redux";
import { allActions } from "../..";

interface Props {
  children: (data: {}) => JSX.Element;
}

export const ProfileCommentsController = (props: Props) => {
  return props.children({});
};
