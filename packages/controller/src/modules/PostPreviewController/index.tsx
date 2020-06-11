interface Props {
  children: (data: {
    upvote: () => void;
    downvote: () => void;
    navigateToPost: () => void;
  }) => JSX.Element;
}

export const PostPreviewController = (props: Props) => {
  const upvote = () => {};

  const downvote = () => {};

  const navigateToPost = () => {};

  return props.children({
    upvote,
    downvote,
    navigateToPost,
  });
};
