interface Props {
  children: (data: {}) => JSX.Element;
}

export const PostController = (props: Props) => {
  return props.children({});
};
