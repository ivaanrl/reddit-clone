interface Props {
  children: (data: {}) => JSX.Element;
}

export const ProfileSavedPostController = (props: Props) => {
  return props.children({});
};
