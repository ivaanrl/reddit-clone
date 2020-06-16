interface Props {
  children: (data: {}) => JSX.Element;
}

export const PostsController = (props: Props) => {
  return props.children({});
};
