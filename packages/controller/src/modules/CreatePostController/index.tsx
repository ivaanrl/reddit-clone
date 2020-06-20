import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    createPost: (subName: string, title: string, content: string[]) => void;
  }) => JSX.Element;
}

export const CreatePostController = (props: Props) => {
  const dispatch = useDispatch();
  const createPost = (subName: string, title: string, content: string[]) => {
    dispatch(
      allActions.createPost({
        subName,
        title,
        content,
      })
    );
  };

  return props.children({ createPost });
};
