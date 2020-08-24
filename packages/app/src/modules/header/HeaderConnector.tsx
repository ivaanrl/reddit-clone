import React from "react";
import { NavbarController } from "@reddit-clone/controller";
import HeaderView from "./ui/HeaderView";

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
