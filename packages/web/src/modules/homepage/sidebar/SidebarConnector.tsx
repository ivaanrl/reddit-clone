import React from "react";
import { SidebarController } from "@reddit-clone/controller";
import SidebarView from "./ui/SidebarView";

const SidebarConnector = () => {
  return <SidebarController>{() => <SidebarView />}</SidebarController>;
};

export default SidebarConnector;
