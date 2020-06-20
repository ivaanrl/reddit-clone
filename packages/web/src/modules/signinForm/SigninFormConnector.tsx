import React from "react";
import { SigninController } from "@reddit-clone/controller";
import SigninFormView from "./ui/SigninFormView";

interface Props {
  closeForm: () => void;
}

const SigninFormConnector = (props: Props) => {
  return (
    <SigninController>
      {({ signin }) => (
        <SigninFormView closeForm={props.closeForm} signin={signin} />
      )}
    </SigninController>
  );
};

export default SigninFormConnector;
