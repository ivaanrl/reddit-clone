import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-themed-styles";
import { styleSheetFactory, styleSheet } from "../../../themes/themes";

const OrderBar = () => {
  const [styles, theme, themeName] = useTheme(styleSheet);

  return <View></View>;
};

export default OrderBar;
