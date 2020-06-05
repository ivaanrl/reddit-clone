import React from "react";
import "./App.scss";
import NavbarConnector from "./modules/navbar/NavbarConnector";
import HomepageConnector from "./modules/homepage/HomepageConnector";
import SignupFormConnector from "./modules/signupForm/SignupFormConnector";

const App = () => {
  return (
    <div>
      <NavbarConnector />
      <HomepageConnector />
      <SignupFormConnector />
    </div>
  );
};

export default App;
