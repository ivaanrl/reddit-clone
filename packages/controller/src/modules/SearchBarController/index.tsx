import React from "react";
import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: { search: (searchValue: string) => void }) => JSX.Element;
}

export const SearchBarController = (props: Props) => {
  const dispatch = useDispatch();

  const search = (searchValue: string) => {
    dispatch(allActions.getPreviewSearchResults(searchValue));
  };

  return props.children({ search });
};
