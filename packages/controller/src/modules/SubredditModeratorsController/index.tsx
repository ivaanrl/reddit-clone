interface Props {
  children: (data: {}) => JSX.Element;
}

export const SubredditModeratorsController = (props: Props) => {
  return props.children({});
};
