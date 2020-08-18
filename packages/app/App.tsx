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
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { darkTheme, lightTheme } from "./src/themes/themes";
import OrderBar from "./src/shared/modules/orderBar/OrderBar";
import Constants from "expo-constants";
import HomepageConnector from "./src/modules/homepage/HomepageConnector";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer, rootSaga } from "@reddit-clone/controller";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App = () => {
  const scheme = useColorScheme();
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
          <SafeAreaView>
            <View style={{ marginTop: statusBarHeight }} />
            <HomepageConnector />
            <Text>Current theme is {scheme}</Text>
          </SafeAreaView>
        </NavigationContainer>
      </AppearanceProvider>
    </Provider>
  );
};

export default App;
