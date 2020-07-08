interface Props {
  children: (data: {}) => JSX.Element;
}

export const ProfilePostController = (props: Props) => {
  return props.children({});
};
