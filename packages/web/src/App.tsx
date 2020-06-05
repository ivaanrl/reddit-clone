import React from "react";
import "./App.scss";
import NavbarConnector from "./modules/navbar/NavbarConnector";
import HomepageConnector from "./modules/homepage/HomepageConnector";

const App = () => {
  return (
    <div>
      <NavbarConnector />
      <HomepageConnector />
    </div>
  );
};

export default App;
