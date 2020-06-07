import superagent from "superagent";
import { APIUrl } from "../../requestInfo";

interface Props {
  children: (data: {
    checkEmailAvailability: (email: string) => Promise<superagent.Response>;
  }) => JSX.Element | null;
}

export const SignupController = (props: Props) => {
  const checkEmailAvailability = async (email: string) => {
    let response;
    try {
      response = await superagent
        .post(APIUrl + "/auth/checkEmail")
        .send({ email });
    } catch (error) {
      response = error.response;
    }
    return response;
  };

  return props.children({ checkEmailAvailability });
};
