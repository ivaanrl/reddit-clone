import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../themes/themes";
import ProfilePostsConnector from "./profilePosts/ProfilePostsConnector";
import ProfileCommentsConnector from "./profileComments/ProfileCommentsConnector";
import Animated from "react-native-reanimated";
import ProfileHeader from "./profileHeader/ProfileHeader";
import { ProfileController } from "@reddit-clone/controller";

const Tab = createMaterialTopTabNavigator();

const ProfileNavigator = () => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const route = useRoute();
  const scrollY = new Animated.Value(0);

  return (
    <React.Fragment>
      <ProfileController>
        {({ getProfile }) => (
          <ProfileHeader
            scrollY={scrollY}
            getProfile={getProfile}
            routeParams={route.params as { username: string }}
          />
        )}
      </ProfileController>
      <Tab.Navigator
        initialRouteName="Posts"
        tabBarOptions={{
          indicatorStyle: { backgroundColor: colors.highlightSelection },
          labelStyle: { fontWeight: "bold", color: colors.textMain },
          tabStyle: { width: 110 },
          contentContainerStyle: { justifyContent: "center" },
          indicatorContainerStyle: {
            marginLeft: 40,
          },
        }}
      >
        <Tab.Screen name="Posts" initialParams={route.params}>
          {() => <ProfilePostsConnector scrollY={scrollY} />}
        </Tab.Screen>
        <Tab.Screen name="Comments" initialParams={route.params}>
          {() => <ProfileCommentsConnector scrollY={scrollY} />}
        </Tab.Screen>
        <Tab.Screen name="Home" initialParams={route.params}>
          {() => <ProfilePostsConnector scrollY={scrollY} />}
        </Tab.Screen>
      </Tab.Navigator>
    </React.Fragment>
  );
};

export default ProfileNavigator;
