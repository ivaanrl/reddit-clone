import React from "react";
import { View, Text, Platform } from "react-native";
import Animated, { Extrapolate } from "react-native-reanimated";
import Constants from "expo-constants";
import { useTheme, useNavigation } from "@react-navigation/native";
import { ThemeColors } from "../../../themes/themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  scrollY: Animated.Value<number>;
}

const ProfileHeader = ({ scrollY }: Props) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const statusBarHeight = Constants.statusBarHeight;

  const height = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, 200, 400],
    outputRange: [0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <React.Fragment>
      <Animated.View
        style={{
          height: height,
          marginTop: statusBarHeight + 25,
          backgroundColor: colors.colorCard,
        }}
      ></Animated.View>
      <Animated.View
        style={{
          backgroundColor: colors.colorCard,
          justifyContent: "center",
          alignItems: "flex-start",
          height: 45,
        }}
      >
        <Animated.Text
          style={{ fontWeight: "bold", fontSize: 16, opacity, marginLeft: 40 }}
        >
          u/Ivaanrl
        </Animated.Text>
      </Animated.View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          marginTop: 10,
          marginLeft: 10,
          backgroundColor: colors.textMain,
          zIndex: 9000,
        }}
      >
        {Platform.OS === "android" ? (
          <Icon name="arrow-left" color={colors.textMain} />
        ) : (
          <Icon name="chevron-left" />
        )}
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default ProfileHeader;
