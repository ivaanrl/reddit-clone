interface Props {
  children: (data: {}) => JSX.Element;
}

export const SubredditController = (props: Props) => {
  return props.children({});
};
