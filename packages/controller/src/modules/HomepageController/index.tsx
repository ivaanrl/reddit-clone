import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: { getPosts: () => void }) => JSX.Element;
}

export const HomepageController = (props: Props) => {
  const dispatch = useDispatch();

  const getPosts = () => {
    dispatch(allActions.getHomepagePosts());
  };

  return props.children({ getPosts });
};
