import React from "react";
import { useDispatch } from "react-redux";
import { allActions } from "../Redux/actions";
interface Props {
  children: (data: { getProfile: (username: string) => void }) => JSX.Element;
}

export const ProfileController = (props: Props) => {
  const dispatch = useDispatch();
  const getProfile = (username: string) => {
    dispatch(allActions.getProfile(username));
  };

  return props.children({ getProfile });
};
