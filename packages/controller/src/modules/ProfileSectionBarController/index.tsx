interface Props {
  children: (data: {}) => JSX.Element;
}

export const ProfileSectionBarController = (props: Props) => {
  return props.children({});
};
