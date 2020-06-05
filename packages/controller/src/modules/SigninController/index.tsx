import superagent from "superagent";
import { APIUrl } from "../../requestInfo";

interface Props {
  children: (data: {
    submit: (values: {
      username: string;
      password: string;
    }) => Promise<superagent.Response>;
  }) => JSX.Element | null;
}

export const SigninController = (props: Props) => {
  const submit = async (values: { username: string; password: string }) => {
    const signinResponse = await superagent.post(APIUrl).send(values);
    return signinResponse;
  };

  return props.children({ submit });
};
