import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import PostConnector from "../../../post/PostConnector";
import { ScrollView } from "react-native-gesture-handler";

const PostsView = () => {
  const homepage = useSelector((state: State) => state.homepage);

  return (
    <ScrollView>
      {homepage.posts.map((post, index) => {
        return (
          <PostConnector
            key={index}
            postInfo={{ ...post, index }}
            showSubredditName={true}
            reducer="homepage"
          />
        );
      })}
    </ScrollView>
  );
};

export default PostsView;
