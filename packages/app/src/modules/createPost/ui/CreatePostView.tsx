import * as React from "react";
import { View } from "react-native";

interface Props {
  createPost: (
    subName: string,
    title: string,
    type: string,
    content?: string[],
    link?: string
  ) => void;
  createImagePost: (post: {
    subName: string;
    title: string;
    type: string;
    image: FileList;
  }) => void;
}

const CreatePostView = (props: Props) => {
  return <View />;
};

export default CreatePostView;
