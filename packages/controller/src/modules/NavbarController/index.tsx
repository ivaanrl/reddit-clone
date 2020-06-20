import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    search: (searchValue: string) => string | null;
    signoutUser: () => void;
  }) => JSX.Element;
}

export const NavbarController = (props: Props) => {
  const dispatch = useDispatch();
  const search = (searchValue: string) => {
    return "this is my response";
  };

  const signoutUser = () => {
    dispatch(allActions.signoutUser());
  };

  return props.children({ search, signoutUser });
};
