import React from "react";

interface Props {
  children: (data: {}) => JSX.Element;
}

const CommentController = (props: Props) => {
  return props.children({});
};

export default CommentController;
