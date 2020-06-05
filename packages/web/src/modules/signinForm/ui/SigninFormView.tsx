import React from "react";
import superagent from "superagent";

interface Props {
  submit: (values: {
    username: string;
    password: string;
  }) => Promise<superagent.Response>;
}

const SigninFormView = (props: Props) => {
  return <div>Sign in form</div>;
};

export default SigninFormView;
