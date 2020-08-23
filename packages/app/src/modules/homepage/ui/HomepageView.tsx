import React from "react";
import { Text, View } from "react-native";
import HomepageOrderBarConnector from "./HomepageOrderBarConnector";
import PostsConnector from "../posts/PostsConnector";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const HomepageView = () => {
  return (
    <View>
      <HomepageOrderBarConnector />
      <PostsConnector />
    </View>
  );
};

export default HomepageView;
