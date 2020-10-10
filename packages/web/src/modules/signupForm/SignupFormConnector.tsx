import React from "react";
import { SignupController } from "@reddit-clone/controller";
import SignupFormView from "./ui/SignupFormView";

interface Props {
  closeForm: () => void;
  switchForm: () => void;
}

const SignupFormConnector = ({ closeForm, switchForm }: Props) => {
  return (
    <SignupController>
      {({ checkEmailAvailability, submitForm }) => (
        <SignupFormView
          checkEmailAvailability={checkEmailAvailability}
          closeForm={closeForm}
          submitForm={submitForm}
          switchForm={switchForm}
        />
      )}
    </SignupController>
  );
};

export default SignupFormConnector;
