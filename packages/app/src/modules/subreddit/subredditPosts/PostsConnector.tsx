import React from "react";
import { View } from "react-native";
import { PostsController } from "@reddit-clone/controller";
import SubredditOrderBarConnector from "./ui/SubredditOrderBarConnector";
import PostsView from "./ui/PostsView";

interface Props {
  setHeaderHeight: any;
  currentHeight: number;
}

const PostsConnector = (props: Props) => {
  const { setHeaderHeight, currentHeight } = props;
  return (
    <PostsController>
      {() => (
        <View>
          <View style={{ marginTop: 25 }} />
          <SubredditOrderBarConnector />
          <PostsView
            setHeaderHeight={setHeaderHeight}
            currentHeight={currentHeight}
          />
        </View>
      )}
    </PostsController>
  );
};

export default PostsConnector;
