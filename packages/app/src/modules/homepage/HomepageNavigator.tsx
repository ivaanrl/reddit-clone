import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomepageConnector from "./HomepageConnector";
import { useTheme, useNavigation } from "@react-navigation/native";
import { ThemeColors } from "../../themes/themes";

const Tab = createMaterialTopTabNavigator();

const HomepageNavigator = () => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        indicatorStyle: { backgroundColor: colors.highlightSelection },
        labelStyle: { fontWeight: "bold", color: colors.textMain },
        tabStyle: { width: 100 },
        contentContainerStyle: { justifyContent: "center" },
        indicatorContainerStyle: {
          marginLeft: 105,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomepageConnector} />
      <Tab.Screen name="Popular" component={HomepageConnector} />
    </Tab.Navigator>
  );
};

export default HomepageNavigator;
