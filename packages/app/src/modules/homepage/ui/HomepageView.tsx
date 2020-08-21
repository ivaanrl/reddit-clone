import React from "react";
import { Text, View } from "react-native";
import HomepageOrderBarConnector from "./HomepageOrderBarConnector";
import PostsConnector from "../posts/PostsConnector";

const HomepageView = () => {
  return (
    <View>
      <HomepageOrderBarConnector />
      <PostsConnector />
    </View>
  );
};

export default HomepageView;
