interface Props {
  children: (data: {}) => JSX.Element;
}

export const ProfileSidebarController = (props: Props) => {
  return props.children({});
};
