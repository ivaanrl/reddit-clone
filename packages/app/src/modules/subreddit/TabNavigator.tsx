import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useTheme, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../themes/themes";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostsConnector from "./subredditPosts/PostsConnector";
import SubredditAbout from "./subredditInfo/SubredditAbout";
import SubredditHeaderInfoConnector from "./subredditHeaderInfo/SubredditHeaderInfoConnector";
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  //Animated,
} from "react-native";
import {
  useSpring,
  animated,
  interpolate,
  AnimatedValue,
  InterpolationChain,
} from "react-spring";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const Tab = createMaterialTopTabNavigator();

interface Props {
  setHeaderHeight: any;
  currentHeight: number;
  scrollY: Animated.Value<number>;
  setScrollY: React.Dispatch<React.SetStateAction<Animated.Value<number>>>;
}

const TabNavigator = (props: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const route = useRoute();
  const { setHeaderHeight, currentHeight, scrollY, setScrollY } = props;

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
      position={new Animated.Value(0)}
    >
      <Tab.Screen name="Posts" initialParams={route.params}>
        {() => {
          return PostsConnector({
            setHeaderHeight,
            currentHeight: 10,
            scrollY: scrollY,
            setScrollY: setScrollY,
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
  );
};

export default TabNavigator;
