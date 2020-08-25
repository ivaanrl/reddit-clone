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
} from "react-native";
import {
  useSpring,
  animated,
  interpolate,
  AnimatedValue,
  InterpolationChain,
} from "react-spring";
import { ScrollView } from "react-native-gesture-handler";

const Tab = createMaterialTopTabNavigator();
const AnimatedView: any = animated(View);

const SubredditNavigator = () => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const route = useRoute();
  //const [headerHeight, setHeaderHeight] = useState(200);
  let prevValue = 0;

  const [{ height }, setHeaderHeight] = useSpring(() => ({
    immediate: true,
    opacity: 1,
    height: 1,
  }));

  const styles = StyleSheet.create({
    subredditHeader: {},
  });

  return (
    <>
      <AnimatedView
        style={{
          height: height.interpolate({
            range: [
              0,
              0.1,
              0.15,
              0.2,
              0.25,
              0.3,
              0.35,
              0.4,
              0.45,
              0.5,
              0.55,
              0.6,
              0.65,
              0.7,
              0.75,
              0.8,
              0.85,
              0.9,
              0.95,
              1,
            ],
            output: [
              0,
              20,
              30,
              40,
              50,
              60,
              70,
              80,
              90,
              100,
              110,
              120,
              130,
              140,
              150,
              160,
              170,
              180,
              190,
              200,
            ],
          }),
          opacity: height.interpolate({
            range: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            output: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          }),
        }}
      >
        <SubredditHeaderInfoConnector />
      </AnimatedView>

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
        <Tab.Screen name="Posts" initialParams={route.params}>
          {() => {
            return PostsConnector({
              setHeaderHeight,
              currentHeight: height.getValue() as number,
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
