import React, { useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useColorScheme, View, Text } from "react-native";
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
import CommunityPicker from "./modules/createPost/ui/CommunityPicker";
import { EventArg } from "@react-navigation/native";
import Animated, {
  Extrapolate,
  TransitioningView,
} from "react-native-reanimated";
import CreatePostSlideMenu from "./shared/modules/createPostSlideMenu/CreatePostSlideMenu";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  const scheme = useColorScheme();
  const statusBarHeight = Constants.statusBarHeight;

  const userAuth = useSelector((state: State) => state.auth);

  /*const createPostMenuPosition = new Animated.Value<number>(0);

  const postMenuBottomInterpolation = createPostMenuPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
    extrapolate: Extrapolate.CLAMP,
  }); */
  const [createPostMenuPosition, setCreatePostMenuPosition] = useState<number>(
    -200
  );

  const ref = useRef<TransitioningView>();

  const showCreatePostMenu = (e: EventArg<"tabPress", true, undefined>) => {
    e.preventDefault();
    //createPostMenuPosition.setValue(1);
    if (ref && ref.current) {
      ref.current?.animateNextTransition();
      setCreatePostMenuPosition(0);
    }
  };

  const hideCreatePostMenu = () => {
    //createPostMenuPosition.setValue(0);
    if (ref && ref.current) {
      ref.current?.animateNextTransition();
      setCreatePostMenuPosition(-200);
    }
  };

  return (
    <React.Fragment>
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
              <Stack.Screen
                name="signupScreen"
                component={SignupFormConnector}
              />
              <Stack.Screen
                name="signinScreen"
                component={SigninFormConnector}
              />
              <Stack.Screen
                name="communityPicker"
                component={CommunityPicker}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="createPost"
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
          listeners={{
            tabPress: (e) => showCreatePostMenu(e),
          }}
        >
          {() => <React.Fragment />}
        </Tab.Screen>
        <Tab.Screen
          name="privateMessages"
          component={privateMessagesConnector}
          options={{
            tabBarIcon: () => <Icon name="envelope" style={{ fontSize: 25 }} />,
            tabBarBadge: 0,
          }}
        />
      </Tab.Navigator>
      <CreatePostSlideMenu
        bottomPosition={createPostMenuPosition}
        hideMenu={hideCreatePostMenu}
        ref={ref}
      />
    </React.Fragment>
  );
};

export default StackNavigator;
