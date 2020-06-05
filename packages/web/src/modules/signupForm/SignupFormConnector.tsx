import React from "react";
import { SignupController } from "@reddit-clone/controller";
import SignupFormView from "./ui/SignupFormView";

const SignupFormConnector = () => {
  return (
    <SignupController>
      {({ submit }) => <SignupFormView submit={submit} />}
    </SignupController>
  );
};

export default SignupFormConnector;
