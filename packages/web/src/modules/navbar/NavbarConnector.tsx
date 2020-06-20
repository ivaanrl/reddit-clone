import React from "react";
import { NavbarController } from "@reddit-clone/controller";
import NavbarView from "./ui/NavbarView";

const NavbarConnector = () => {
  return (
    <NavbarController>
      {({ search, signoutUser }) => (
        <NavbarView search={search} signoutUser={signoutUser} />
      )}
    </NavbarController>
  );
};

export default NavbarConnector;
