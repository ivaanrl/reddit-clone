interface Props {
  children: (data: {}) => JSX.Element | null;
}

export const SidebarController = (props: Props) => {
  return props.children({});
};
