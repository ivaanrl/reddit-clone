import React from "react";
import { NavbarController } from "@reddit-clone/controller";
import HeaderView from "./ui/HeaderView";
import { StackHeaderProps } from "@react-navigation/stack";

interface Props {
  backButton: boolean;
}

const HeaderConnector = (props: Props) => {
  return (
    <NavbarController>
      {({ signoutUser }) => (
        <HeaderView signoutUser={signoutUser} backButton={props.backButton} />
      )}
    </NavbarController>
  );
};

export default HeaderConnector;
