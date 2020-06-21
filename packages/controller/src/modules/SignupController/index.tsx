import superagent from "superagent";
import { APIUrl } from "../../requestInfo";
import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    checkEmailAvailability: (email: string) => Promise<superagent.Response>;
    submitForm: (values: {
      email: string;
      password: string;
      username: string;
    }) => void;
  }) => JSX.Element;
}

export const SignupController = (props: Props) => {
  const dispatch = useDispatch();
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

  const submitForm = (values: {
    email: string;
    password: string;
    username: string;
  }) => {
    dispatch(allActions.signupUser(values));
  };

  return props.children({ checkEmailAvailability, submitForm });
};
