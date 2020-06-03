import React from "react";
import { NavbarController } from "@reddit-clone/controller";
import NavbarView from "./ui/NavbarView";

const NavbarConnector = () => {
  return (
    <NavbarController>
      {({ search }) => <NavbarView search={search} />}
    </NavbarController>
  );
};

export default NavbarConnector;
