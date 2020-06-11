interface Props {
  children: () => JSX.Element;
}

export const SigninController = (props: Props) => {
  return props.children();
};
