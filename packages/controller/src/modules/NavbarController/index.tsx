import React from "react";

interface NavbarControllerProps {
  children: (data: {
    search: (searchValue: string) => null;
  }) => JSX.Element | null;
}

export const NavbarController = (props: NavbarControllerProps) => {
  const search = (searchValue: string) => {
    console.log(searchValue);
    return null;
  };

  return props.children({ search });
};
