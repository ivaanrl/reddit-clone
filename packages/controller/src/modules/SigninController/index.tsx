import { useDispatch } from "react-redux";
import { allActions } from "../Redux/actions";

interface Props {
  children: (data: {
    signin: (values: { username: string; password: string }) => void;
  }) => JSX.Element;
}

export const SigninController = (props: Props) => {
  const dispatch = useDispatch();

  const signin = (values: { username: string; password: string }) => {
    dispatch(allActions.signinUser(values));
  };

  return props.children({ signin });
};
