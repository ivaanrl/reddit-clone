import React from "react";
import { SignupController } from "@reddit-clone/controller";
import SignupFormView from "./ui/SignupFormView";

interface Props {
  closeForm: () => void;
}

const SignupFormConnector = ({ closeForm }: Props) => {
  return (
    <SignupController>
      {({ checkEmailAvailability, submitForm }) => (
        <SignupFormView
          checkEmailAvailability={checkEmailAvailability}
          closeForm={closeForm}
          submitForm={submitForm}
        />
      )}
    </SignupController>
  );
};

export default SignupFormConnector;
