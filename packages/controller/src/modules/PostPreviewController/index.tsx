interface Props {
  children: (data: { navigateToPost: () => void }) => JSX.Element;
}

export const PostPreviewController = (props: Props) => {
  const navigateToPost = () => {};

  return props.children({
    navigateToPost,
  });
};
