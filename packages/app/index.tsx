import "react-native-gesture-handler";
import React from "react";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { darkTheme, lightTheme } from "./src/themes/themes";
import Constants from "expo-constants";
import { createStore, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer, rootSaga, State } from "@reddit-clone/controller";
import HeaderConnector from "./src/modules/header/HeaderConnector";
import HomepageNavigator from "./src/modules/homepage/HomepageNavigator";
import SearchResultsScreen from "./src/modules/header/searchBar/ui/SearchResultsScreen";
import SubredditNavigator from "./src/modules/subreddit/SubredditNavigator";
import SubredditHeaderConnector from "./src/modules/subreddit/subredditHeader/SubredditHeaderConnector";
import FullPostConnector from "./src/modules/fullpost/FullPostConnector";
import ProfileNavigator from "./src/modules/profile/ProfileNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./src/CustomDrawerContent";
import App from "./src/App";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const MainApp = () => {
  const scheme = useColorScheme();
  const statusBarHeight = Constants.statusBarHeight;

  //<View style={{ marginTop: statusBarHeight }} />

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  //const userAuth = useSelector((state:State) => state.auth);

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <App />
      </AppearanceProvider>
    </Provider>
  );
};

export default MainApp;

/*
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
          </Stack.Navigator>*/
