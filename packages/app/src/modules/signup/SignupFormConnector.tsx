import React from "react";
import { SignupController } from "@reddit-clone/controller";
import SignupFormView from "./ui/SignupFormView";

const SignupFormConnector = () => {
  return (
    <SignupController>
      {({ checkEmailAvailability, submitForm }) => (
        <SignupFormView
          checkEmailAvailability={checkEmailAvailability}
          submitForm={submitForm}
        />
      )}
    </SignupController>
  );
};

export default SignupFormConnector;
