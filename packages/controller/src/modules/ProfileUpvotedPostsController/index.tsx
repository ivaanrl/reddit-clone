interface Props {
  children: (data: {}) => JSX.Element;
}

export const ProfileUpvotedPostsController = (props: Props) => {
  return props.children({});
};
