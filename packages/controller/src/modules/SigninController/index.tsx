interface Props {
  children: () => JSX.Element | null;
}

export const SigninController = (props: Props) => {
  return props.children();
};
