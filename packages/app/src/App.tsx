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
import { useDispatch, useSelector } from "react-redux";
import { allActions, State } from "@reddit-clone/controller";
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
import CreateImagePostConnector from "./modules/createPost/createImagePost/CreateImagePostConnector";
import CreateLinkPostConnector from "./modules/createPost/createLinkPost/CreateLinkPostConnector";
import AuthProtection from "./modules/authProtection/AuthProtection";
import AsyncStorage from "@react-native-community/async-storage";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const scheme = useColorScheme();
  const statusBarHeight = Constants.statusBarHeight;
  const dispatch = useDispatch();

  const userAuth = useSelector((state: State) => state.auth);

  useEffect(() => {
    getStoredUser();
  }, [userAuth.email]);

  const getStoredUser = async () => {
    const storedUser = await AsyncStorage.getItem("userInfo");
    if (!storedUser) return;

    const jsonStoredUser = JSON.parse(storedUser);
    dispatch(allActions.signupUserCompletedAction(jsonStoredUser));
  };

  return (
    <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
      <Drawer.Navigator
        initialRouteName="stackNavigator"
        drawerContent={(props) => {
          return userAuth.username == "" || userAuth.username === undefined ? (
            <CustomDrawerSignedOut scheme={scheme} {...props} />
          ) : (
            <CustomDrawerContent scheme={scheme} userAuth={userAuth} />
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
        <Drawer.Screen
          name="createImagePost"
          component={CreateImagePostConnector}
        />
        <Drawer.Screen
          name="createLinkPost"
          component={CreateLinkPostConnector}
        />
        <Drawer.Screen name="userNotAuth" component={AuthProtection} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
