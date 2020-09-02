import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useColorScheme, View } from "react-native";
import { State } from "@reddit-clone/controller";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "./themes/themes";
import HomepageNavigator from "./modules/homepage/HomepageNavigator";
import HeaderConnector from "./modules/header/HeaderConnector";
import SearchResultsScreen from "./modules/header/searchBar/ui/SearchResultsScreen";
import SubredditNavigator from "./modules/subreddit/SubredditNavigator";
import SubredditHeaderConnector from "./modules/subreddit/subredditHeader/SubredditHeaderConnector";
import FullPostConnector from "./modules/fullpost/FullPostConnector";
import ProfileNavigator from "./modules/profile/ProfileNavigator";
import SignupFormConnector from "./modules/signup/SignupFormConnector";
import SigninFormConnector from "./modules/signin/SigninFormConnector";
import CreatePostConnector from "./modules/createPost/CreatePostConnector";
import privateMessagesConnector from "./modules/privateMessages/privateMessagesConnector";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  const scheme = useColorScheme();
  const statusBarHeight = Constants.statusBarHeight;

  const userAuth = useSelector((state: State) => state.auth);

  return (
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
            <Icon name="reddit-alien" style={{ fontSize: 25 }} />
          ),
        }}
      >
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
            <Stack.Screen name="signupScreen" component={SignupFormConnector} />
            <Stack.Screen name="signinScreen" component={SigninFormConnector} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="createPost"
        component={CreatePostConnector}
        options={{
          tabBarIcon: () => (
            <View
              style={{
                borderWidth: 1,
                borderColor:
                  scheme === "dark"
                    ? darkTheme.colors.highlightSelection
                    : lightTheme.colors.highlightSelection,
                borderRadius: 100,
                width: 35,
                height: 35,
                alignItems: "center",
                marginTop: -4,
              }}
            >
              <Icon
                name="pencil"
                style={{
                  fontSize: 20,
                  margin: 5,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="privateMessages"
        component={privateMessagesConnector}
        options={{
          tabBarIcon: () => <Icon name="envelope" style={{ fontSize: 25 }} />,
          tabBarBadge: 0,
        }}
      />
    </Tab.Navigator>
  );
};

export default StackNavigator;
