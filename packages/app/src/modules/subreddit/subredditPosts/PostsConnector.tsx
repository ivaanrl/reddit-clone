import React from "react";
import { View } from "react-native";
import { PostsController } from "@reddit-clone/controller";
import SubredditOrderBarConnector from "./ui/SubredditOrderBarConnector";
import PostsView from "./ui/PostsView";

interface Props {
  setHeight: React.Dispatch<React.SetStateAction<number>>;
}

const PostsConnector = (props: Props) => {
  const { setHeight } = props;
  return (
    <PostsController>
      {() => (
        <View>
          <View style={{ marginTop: 25 }} />
          <SubredditOrderBarConnector />
          <PostsView setHeight={setHeight} />
        </View>
      )}
    </PostsController>
  );
};

export default PostsConnector;
