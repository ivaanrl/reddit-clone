interface Props {
  children: (data: {}) => JSX.Element;
}

export const CreatePostCommunityController = (props: Props) => {
  return props.children({});
};
