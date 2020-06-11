interface Props {
  children: (data: {}) => JSX.Element;
}

export const SidebarController = (props: Props) => {
  return props.children({});
};
