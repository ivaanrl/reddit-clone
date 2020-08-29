import React, { useEffect } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import Animated, { Extrapolate } from "react-native-reanimated";
import Constants from "expo-constants";
import { useTheme, useNavigation, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../../themes/themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { separatorStyles } from "../../../styles";
import { State } from "@reddit-clone/controller";
import { useSelector } from "react-redux";

interface Props {
  scrollY: Animated.Value<number>;
  getProfile: (username: string) => void;
  routeParams: { username?: string };
}

const ProfileHeader = ({ scrollY, getProfile, routeParams }: Props) => {
  const { userInfo, posts } = useSelector((state: State) => state.profile);
  const { username, karma, createdAt } = userInfo;
  const navigation = useNavigation();
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const statusBarHeight = Constants.statusBarHeight;
  const route = useRoute();
  useEffect(() => {
    if (routeParams && routeParams.username) {
      getProfile(routeParams.username);
    }
  }, [route.params]);

  const height = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [250, statusBarHeight + 64],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, 300, 400],
    outputRange: [0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const oppositeOpacity = scrollY.interpolate({
    inputRange: [0, 300, 400],
    outputRange: [1, 0, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const styles = StyleSheet.create({
    mainContainer: {},
    header: {
      backgroundColor: colors.highlightSelection,
      height: 140,
      paddingTop: statusBarHeight + 25,
      position: "relative",
    },
    profilePictureContainer: {
      height: 50,
      width: 50,
      borderWidth: 1,
      borderColor: colors.colorCard,
      borderRadius: 100,
      backgroundColor: colors.textMuted,
      position: "absolute",
      bottom: -10,
      left: 10,
    },
    profilePicture: {},
    username: {
      fontWeight: "bold",
      color: colors.textMain,
      fontSize: 18,
      marginTop: 20,
      marginLeft: 10,
      marginBottom: 10,
    },
    usernameWithU: {
      fontWeight: "bold",
      color: colors.textMain,
      marginLeft: 10,
      fontSize: 16,
    },
    userInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      paddingLeft: 10,
    },
    userInfoText: {
      color: colors.textMuted,
      fontSize: 12,
    },
    dotSeparator: {
      ...separatorStyles.dotSeparator,
      backgroundColor: colors.textMuted,
    },
  });

  const getYearsFromDate = (date: string): string => {
    const dateYear = parseInt(date.split("-")[0], 10);
    const currentYear = new Date().getFullYear();
    return (currentYear as number) - dateYear + "y";
  };
  return (
    <React.Fragment>
      <Animated.View
        style={{
          height: height,
          backgroundColor: colors.colorCard,
          opacity: oppositeOpacity,
        }}
      >
        <View style={styles.header}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture} />
          </View>
        </View>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.usernameWithU}>u/{username}</Text>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}> {karma} karma </Text>
          <View style={styles.dotSeparator} />
          <Text style={styles.userInfoText}>
            {" "}
            {getYearsFromDate(createdAt)}{" "}
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          backgroundColor: colors.highlightSelection,
          alignItems: "center",
          flexDirection: "row",
          height: statusBarHeight + 64,
          opacity,
          position: "absolute",
          paddingBottom: 10,
          top: 0,
          paddingTop: statusBarHeight + 34,
          left: 0,
          right: 0,
          zIndex: 900,
        }}
      >
        {Platform.OS === "android" ? (
          <Icon
            name="arrow-left"
            color={colors.textMain}
            style={{
              fontSize: 22,
              marginLeft: 10,
            }}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Icon
            name="chevron-left"
            style={{
              fontSize: 22,
              marginLeft: 10,
            }}
            onPress={() => navigation.goBack()}
          />
        )}
        <Animated.Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            opacity,
            marginLeft: 35,
            color: "white",
          }}
        >
          u/Ivaanrl
        </Animated.Text>
      </Animated.View>
    </React.Fragment>
  );
};

export default ProfileHeader;
