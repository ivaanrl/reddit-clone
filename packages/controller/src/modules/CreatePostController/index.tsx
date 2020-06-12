interface Props {
  children: (data: {}) => JSX.Element;
}

export const CreatePostController = (props: Props) => {
  return props.children({});
};
