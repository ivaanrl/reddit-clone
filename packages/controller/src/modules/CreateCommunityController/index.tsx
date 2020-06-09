interface Props {
  children: (data: { submit: (values: any) => void }) => JSX.Element | null;
}

export const CreateCommunityController = (props: Props) => {
  const submit = (values: any) => {};

  return props.children({ submit });
};
