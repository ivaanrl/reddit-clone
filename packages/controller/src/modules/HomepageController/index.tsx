interface Props {
  children: (data: { getPosts: () => string | null }) => JSX.Element;
}

export const HomepageController = (props: Props) => {
  const getPosts = () => {
    return null;
  };

  return props.children({ getPosts });
};
