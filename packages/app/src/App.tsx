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

const App = () => {
  const scheme = useColorScheme();
  const statusBarHeight = Constants.statusBarHeight;

  //<View style={{ marginTop: statusBarHeight }} />

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const userAuth = useSelector((state: State) => state.auth);
  //const navigation = useNavigation();

  return (
    <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
      <Drawer.Navigator
        initialRouteName="stackNavigator"
        drawerContent={(props) => {
          return userAuth.username != "" ? (
            CustomDrawerContent({ scheme, userAuth })
          ) : (
            <CustomDrawerSignedOut scheme={scheme} {...props} />
          );
        }}
      >
        <Drawer.Screen name="stackNavigator">
          {() => (
            <Stack.Navigator initialRouteName="Homepage">
              <Stack.Screen
                name="Homepage"
                component={HomepageNavigator}
                options={{
                  headerTitle: () => <HeaderConnector backButton={false} />,
                }}
              />
              <Stack.Screen
                name="searchResults"
                component={SearchResultsScreen}
                options={{
                  headerTitle: () => <HeaderConnector backButton={true} />,
                }}
              />
              <Stack.Screen
                name="subreddit"
                component={SubredditNavigator}
                options={{
                  headerTitle: () => <SubredditHeaderConnector />,
                }}
              />
              <Stack.Screen name="fullpost" component={FullPostConnector} />
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
            </Stack.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
