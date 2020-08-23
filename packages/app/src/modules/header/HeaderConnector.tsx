import React from "react";
import { NavbarController } from "@reddit-clone/controller";
import HeaderView from "./ui/HeaderView";

const HeaderConnector = () => {
  return (
    <NavbarController>
      {({ signoutUser }) => <HeaderView signoutUser={signoutUser} />}
    </NavbarController>
  );
};

export default HeaderConnector;
