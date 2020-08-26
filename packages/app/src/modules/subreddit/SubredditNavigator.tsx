import React, { useState } from "react";
import { useTheme, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../themes/themes";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostsConnector from "./subredditPosts/PostsConnector";
import SubredditAbout from "./subredditInfo/SubredditAbout";
import SubredditHeaderInfoConnector from "./subredditHeaderInfo/SubredditHeaderInfoConnector";
import { Animated } from "react-native";

const Tab = createMaterialTopTabNavigator();

const MAX_HEADER_HEIGHT = 200;
const MIN_HEADER_HEIGHT = 0;

const SubredditNavigator = () => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const route = useRoute();

  const [scrollY, _] = useState(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <>
      <Animated.View
        style={{
          height: headerHeight,
          opacity: headerOpacity,
        }}
      >
        <SubredditHeaderInfoConnector />
      </Animated.View>

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
        style={{
          marginTop: 1,
        }}
      >
        <Tab.Screen name="Posts" initialParams={route.params}>
          {() => {
            return PostsConnector({
              scrollY: scrollY,
            });
          }}
        </Tab.Screen>
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
    </>
  );
};

export default SubredditNavigator;
