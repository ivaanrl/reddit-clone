import React from "react";
import { SigninController } from "@reddit-clone/controller";
import SigninFormView from "./ui/SigninFormView";

const SigninFormConnector = () => {
  return (
    <SigninController>
      {({ submit }) => <SigninFormView submit={submit} />}
    </SigninController>
  );
};

export default SigninFormConnector;
