import React from "react";
import { View } from "react-native";
import { PostsController } from "@reddit-clone/controller";
import SubredditOrderBarConnector from "./ui/SubredditOrderBarConnector";
import PostsView from "./ui/PostsView";
import { useRoute } from "@react-navigation/native";

const PostsConnector = () => {
  const route = useRoute();
  console.log("lkanbd", route.params);

  return (
    <PostsController>
      {() => (
        <React.Fragment>
          <View style={{ marginTop: 25 }} />
          <SubredditOrderBarConnector />
          <PostsView />
        </React.Fragment>
      )}
    </PostsController>
  );
};

export default PostsConnector;
