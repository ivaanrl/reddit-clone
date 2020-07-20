interface Props {
  children: (data: {}) => JSX.Element;
}

export const SubredditDropdownController = (props: Props) => {
  return props.children({});
};
