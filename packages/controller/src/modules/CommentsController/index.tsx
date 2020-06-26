import React from "react";

interface Props {
  children: (data: {}) => JSX.Element;
}

const CommentsController = (props: Props) => {
  return props.children({});
};

export default CommentsController;
