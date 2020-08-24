import React, { useState, useLayoutEffect, useRef } from "react";
import { useTheme, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../themes/themes";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostsConnector from "./subredditPosts/PostsConnector";
import SubredditAbout from "./subredditInfo/SubredditAbout";
import SubredditHeaderInfoConnector from "./subredditHeaderInfo/SubredditHeaderInfoConnector";
import { View, ViewComponent } from "react-native";
import { useSpring, animated } from "react-spring";

const Tab = createMaterialTopTabNavigator();
const AnimatedView: any = animated(View);

const SubredditNavigator = () => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const route = useRoute();

  const [height, setHeight] = useState(200);

  const ref = useRef<React.RefAttributes<View>>(null);

  const animationProps = useSpring({ marginTop: height });

  return (
    <React.Fragment>
      <View style={{ position: "absolute", right: 0, left: 0 }}>
        <SubredditHeaderInfoConnector />
      </View>

      <AnimatedView style={{ ...animationProps }} />
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
        lazy={true}
        lazyPreloadDistance={1}
      >
        <Tab.Screen name="Posts" initialParams={route.params}>
          {() => PostsConnector({ setHeight })}
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
    </React.Fragment>
  );
};

export default SubredditNavigator;
