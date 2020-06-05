import superagent from "superagent";
import { APIUrl } from "../../requestInfo";

interface Props {
  children: (data: {
    submit: (values: {
      email: string;
      username: string;
      password: string;
    }) => Promise<superagent.Response>;
  }) => JSX.Element | null;
}

export const SignupController = (props: Props) => {
  const submit = async (values: {
    email: string;
    username: string;
    password: string;
  }) => {
    const signupResponse = await superagent
      .post(APIUrl + "/auth/signup")
      .send(values);
    return signupResponse;
  };

  return props.children({ submit });
};
