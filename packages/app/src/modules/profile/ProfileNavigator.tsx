import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../themes/themes";
import ProfilePostsConnector from "./profilePosts/ProfilePostsConnector";

const Tab = createMaterialTopTabNavigator();

const ProfileNavigator = () => {
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
        initialParams={route.params}
        component={ProfilePostsConnector}
      />
    </Tab.Navigator>
  );
};

export default ProfileNavigator;
