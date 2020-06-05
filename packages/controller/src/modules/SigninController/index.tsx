interface Props {
  children: (data: { submit: (values: any) => null }) => JSX.Element | null;
}

export const SigninController = (props: Props) => {
  const submit = (values: any) => {
    return null;
  };

  return props.children({ submit });
};
