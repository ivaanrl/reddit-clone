import React from "react";
import { View, Text } from "react-native";
import { State } from "@reddit-clone/controller";
import { useSelector } from "react-redux";
import PostConnector from "../../../post/PostConnector";

const PostsView = () => {
  const subreddit = useSelector((state: State) => state.subreddit);

  return (
    <View>
      <Text style={{ color: "white" }}>This is posts view</Text>
      {subreddit.posts.map((post, index) => {
        return (
          <PostConnector
            key={index}
            postInfo={{ ...post, index }}
            showSubredditName={false}
            reducer="subreddit"
          />
        );
      })}
    </View>
  );
};

export default PostsView;
