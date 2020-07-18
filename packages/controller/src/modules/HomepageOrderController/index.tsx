import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getPosts: (order: string, time: string) => void;
  }) => JSX.Element;
}

export const HomepageOrderController = (props: Props) => {
  const dispatch = useDispatch();

  const getPosts = (order: string, time: string) => {
    dispatch(allActions.getHomepagePosts(order, time));
  };

  return props.children({ getPosts });
};
