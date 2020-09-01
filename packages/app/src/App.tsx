import React from "react";
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
import { useColorScheme } from "react-native";
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
          {() => (
            <Tab.Navigator
              labeled={false}
              activeColor={
                scheme === "dark"
                  ? darkTheme.colors.textMain
                  : lightTheme.colors.textMain
              }
              inactiveColor={
                scheme === "dark"
                  ? darkTheme.colors.textMuted
                  : lightTheme.colors.textMuted
              }
              barStyle={{
                backgroundColor:
                  scheme === "dark"
                    ? darkTheme.colors.colorCard
                    : lightTheme.colors.colorCard,
                height: 45,
                borderTopWidth: 1,
                borderTopColor:
                  scheme === "dark"
                    ? darkTheme.colors.colorLine
                    : lightTheme.colors.colorLine,
              }}
            >
              <Tab.Screen
                name="home"
                options={{
                  tabBarIcon: () => (
                    <Icon name="user" style={{ fontSize: 25 }} />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator initialRouteName="Homepage">
                    <Stack.Screen
                      name="Homepage"
                      component={HomepageNavigator}
                      options={{
                        headerTitle: () => (
                          <HeaderConnector backButton={false} />
                        ),
                      }}
                    />
                    <Stack.Screen
                      name="searchResults"
                      component={SearchResultsScreen}
                      options={{
                        headerTitle: () => (
                          <HeaderConnector backButton={true} />
                        ),
                      }}
                    />
                    <Stack.Screen
                      name="subreddit"
                      component={SubredditNavigator}
                      options={{
                        headerTitle: () => <SubredditHeaderConnector />,
                      }}
                    />
                    <Stack.Screen
                      name="fullpost"
                      component={FullPostConnector}
                    />
                    <Stack.Screen
                      name="profile"
                      options={{
                        headerShown: false,
                      }}
                    >
                      {() => <ProfileNavigator />}
                    </Stack.Screen>
                    <Stack.Screen
                      name="signupScreen"
                      component={SignupFormConnector}
                    />
                    <Stack.Screen
                      name="signinScreen"
                      component={SigninFormConnector}
                    />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
