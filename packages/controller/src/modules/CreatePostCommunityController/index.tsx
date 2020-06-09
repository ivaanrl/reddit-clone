interface Props {
  children: (data: {}) => JSX.Element | null;
}

export const CreatePostCommunityController = (props: Props) => {
  return props.children({});
};
