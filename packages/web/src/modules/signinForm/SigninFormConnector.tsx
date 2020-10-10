import React from "react";
import { SigninController } from "@reddit-clone/controller";
import SigninFormView from "./ui/SigninFormView";

interface Props {
  closeForm: () => void;
  switchForm: () => void;

}

const SigninFormConnector = ({closeForm,switchForm}: Props) => {
  return (
    <SigninController>
      {({ signin }) => (
        <SigninFormView closeForm={closeForm} signin={signin} switchForm={switchForm} />
      )}
    </SigninController>
  );
};

export default SigninFormConnector;
