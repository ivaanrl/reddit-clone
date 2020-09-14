import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getPosts: (order: string, time: string, page: number) => void;
    clearPosts: () => void;
  }) => JSX.Element;
}

export const HomepageOrderController = (props: Props) => {
  const dispatch = useDispatch();

  const getPosts = (order: string, time: string, page: number) => {
    dispatch(allActions.getHomepagePosts(order, time, page));
  };

  const clearPosts = () => {
    dispatch(allActions.clearHomepagePosts());
  };

  return props.children({ getPosts, clearPosts });
};
