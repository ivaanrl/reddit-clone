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

const App = () => {
  const scheme = useColorScheme();
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
        <SafeAreaView>
          <View style={{ marginTop: statusBarHeight }} />
          <OrderBar defaultSort="new" />
          <Text>Current theme is {scheme}</Text>
        </SafeAreaView>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;
