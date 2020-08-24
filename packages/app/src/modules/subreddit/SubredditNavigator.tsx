import React from "react";
import { useTheme, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../themes/themes";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostsConnector from "./subredditPosts/PostsConnector";
import SubredditAbout from "./subredditInfo/SubredditAbout";

const Tab = createMaterialTopTabNavigator();

const SubredditNavigator = () => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;

  const route = useRoute();

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      tabBarOptions={{
        indicatorStyle: { backgroundColor: colors.highlightSelection },
        labelStyle: { fontWeight: "bold", color: colors.textMain },
        tabStyle: { width: 100 },
        contentContainerStyle: { justifyContent: "center" },
        indicatorContainerStyle: {
          marginLeft: 60,
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsConnector}
        initialParams={route.params}
      />
      <Tab.Screen
        name="About"
        component={SubredditAbout}
        initialParams={route.params}
      />
      <Tab.Screen
        name="Menu"
        component={SubredditAbout}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};

export default SubredditNavigator;
