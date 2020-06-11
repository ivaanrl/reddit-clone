interface Props {
  children: (data: {
    search: (searchValue: string) => string | null;
  }) => JSX.Element;
}

export const NavbarController = (props: Props) => {
  const search = (searchValue: string) => {
    return "this is my response";
  };

  return props.children({ search });
};
