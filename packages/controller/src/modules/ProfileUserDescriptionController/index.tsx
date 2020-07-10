import React from "react";

interface Props {
  children: (data: {}) => JSX.Element;
}

export const ProfileUserDescriptionController = (props: Props) => {
  return props.children({});
};
