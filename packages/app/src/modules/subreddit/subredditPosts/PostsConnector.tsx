import React from "react";
import { View, Animated } from "react-native";
import { PostsController } from "@reddit-clone/controller";
import SubredditOrderBarConnector from "./ui/SubredditOrderBarConnector";
import PostsView from "./ui/PostsView";

interface Props {
  scrollY: Animated.Value;
}

const PostsConnector = (props: Props) => {
  const { scrollY } = props;
  return (
    <PostsController>
      {() => (
        <View>
          <View style={{ marginTop: 25 }} />
          <SubredditOrderBarConnector />
          <PostsView scrollY={scrollY} />
        </View>
      )}
    </PostsController>
  );
};

export default PostsConnector;
