interface Props {
  children: (data: {}) => JSX.Element;
}

export const CreatePostNavbarController = (props: Props) => {
  return props.children({});
};
