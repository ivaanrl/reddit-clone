import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { darkTheme, lightTheme } from "./themes/themes";
import CustomDrawerContent from "./CustomDrawerContent";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { allActions, State } from "@reddit-clone/controller";
import CustomDrawerSignedOut from "../CustomDrawerSignedOut";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
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
