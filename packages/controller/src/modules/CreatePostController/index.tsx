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
    createImagePost: (post: {
      subName: string;
      title: string;
      type: string;
      image: FileList;
    }) => void;
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

  const createImagePost = (post: {
    subName: string;
    title: string;
    type: string;
    image: FileList;
  }) => {
    dispatch(allActions.createImagePost(post));
  };

  return props.children({ createPost, createImagePost });
};
