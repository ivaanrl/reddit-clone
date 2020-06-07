import React from "react";
import { SigninController } from "@reddit-clone/controller";
import SigninFormView from "./ui/SigninFormView";

interface Props {
  closeForm: () => void;
}

const SigninFormConnector = (props: Props) => {
  return (
    <SigninController>
      {() => <SigninFormView closeForm={props.closeForm} />}
    </SigninController>
  );
};

export default SigninFormConnector;
