import React from "react";
import { SigninController } from "@reddit-clone/controller";
import SigninFormView from "./ui/SigninFormView";

const SigninFormConnector = () => {
  return (
    <SigninController>
      {({ signin }) => <SigninFormView signin={signin} />}
    </SigninController>
  );
};

export default SigninFormConnector;
