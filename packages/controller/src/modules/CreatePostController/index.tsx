import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    createPost: (
      subName: string,
      title: string,
      type: string,
      content?: string[],
      link?: string
    ) => void;
  }) => JSX.Element;
}

export const CreatePostController = (props: Props) => {
  const dispatch = useDispatch();
  const createPost = (
    subName: string,
    title: string,
    type: string,
    content?: string[],
    link?: string
  ) => {
    if (link) {
      dispatch(
        allActions.createPost({
          subName,
          title,
          link,
          type,
        })
      );
    } else if (content) {
      dispatch(
        allActions.createPost({
          subName,
          title,
          content,
          type,
        })
      );
    }
  };

  return props.children({ createPost });
};
