import React from "react";

interface Props {
  children: (data: {}) => JSX.Element;
}

export const CommentsController = (props: Props) => {
  return props.children({});
};
