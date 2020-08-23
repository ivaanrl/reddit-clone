import "react-native-gesture-handler";
import React from "react";
import {
  AppearanceProvider,
  useColorScheme,
  Appearance,
} from "react-native-appearance";
import {
  //useColorScheme,
  View,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { darkTheme, lightTheme } from "./src/themes/themes";
import OrderBar from "./src/shared/modules/orderBar/OrderBar";
import Constants from "expo-constants";
import HomepageConnector from "./src/modules/homepage/HomepageConnector";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer, rootSaga } from "@reddit-clone/controller";
import HeaderConnector from "./src/modules/header/HeaderConnector";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App = () => {
  const scheme = useColorScheme();
  const statusBarHeight = Constants.statusBarHeight;

  //<View style={{ marginTop: statusBarHeight }} />

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
          <Stack.Navigator initialRouteName="Homepage">
            <Stack.Screen
              name="Homepage"
              component={HomepageConnector}
              options={{
                //headerShown: false
                headerTitle: () => <HeaderConnector />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    </Provider>
  );
};

export default App;
