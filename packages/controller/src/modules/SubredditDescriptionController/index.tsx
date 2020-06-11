interface Props {
  children: (data: {}) => JSX.Element;
}

export const SubredditDescriptionController = (props: Props) => {
  return props.children({});
};
