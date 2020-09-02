import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { darkTheme, lightTheme } from "./themes/themes";
import CustomDrawerContent from "./CustomDrawerContent";
import HomepageNavigator from "./modules/homepage/HomepageNavigator";
import HeaderConnector from "./modules/header/HeaderConnector";
import SearchResultsScreen from "./modules/header/searchBar/ui/SearchResultsScreen";
import SubredditNavigator from "./modules/subreddit/SubredditNavigator";
import SubredditHeaderConnector from "./modules/subreddit/subredditHeader/SubredditHeaderConnector";
import FullPostConnector from "./modules/fullpost/FullPostConnector";
import ProfileNavigator from "./modules/profile/ProfileNavigator";
import { useColorScheme, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import CustomDrawerSignedOut from "../CustomDrawerSignedOut";
import SignupFormConnector from "./modules/signup/SignupFormConnector";
import SigninFormConnector from "./modules/signin/SigninFormConnector";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import CreatePostConnector from "./modules/createPost/CreatePostConnector";
import privateMessagesConnector from "./modules/privateMessages/privateMessagesConnector";
import StackNavigator from "./StackNavigator";
import CreateTextPostConnector from "./modules/createPost/createTextPost/CreateTextPostConnector";
import CommunityPicker from "./modules/createPost/ui/CommunityPicker";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const scheme = useColorScheme();
  const statusBarHeight = Constants.statusBarHeight;

  const userAuth = useSelector((state: State) => state.auth);

  return (
    <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
      <Drawer.Navigator
        initialRouteName="stackNavigator"
        drawerContent={(props) => {
          return userAuth.username != "" ? (
            <CustomDrawerContent scheme={scheme} userAuth={userAuth} />
          ) : (
            <CustomDrawerSignedOut scheme={scheme} {...props} />
          );
        }}
      >
        <Drawer.Screen name="stackNavigator">
          {() => <StackNavigator />}
        </Drawer.Screen>
        <Drawer.Screen
          name="createTextPost"
          component={CreateTextPostConnector}
        />
        <Drawer.Screen name="communityPicker" component={CommunityPicker} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
