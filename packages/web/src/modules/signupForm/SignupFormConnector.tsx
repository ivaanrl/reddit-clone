import React from "react";
import { SignupController } from "@reddit-clone/controller";
import SignupFormView from "./ui/SignupFormView";

interface Props {
  closeForm: () => void;
}

const SignupFormConnector = ({ closeForm }: Props) => {
  return (
    <SignupController>
      {({ checkEmailAvailability }) => (
        <SignupFormView
          checkEmailAvailability={checkEmailAvailability}
          closeForm={closeForm}
        />
      )}
    </SignupController>
  );
};

export default SignupFormConnector;
