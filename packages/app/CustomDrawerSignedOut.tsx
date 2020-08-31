import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { darkTheme, lightTheme } from "./src/themes/themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";

interface Props {
  scheme: string | undefined | null;
}

const CustomDrawerSignedOut = ({
  scheme,
  navigation,
}: Props & DrawerContentComponentProps<DrawerContentOptions>) => {
  const { colors } = scheme === "dark" ? darkTheme : lightTheme;
  const styles = StyleSheet.create({
    mainContainer: {
      padding: 10,
      paddingTop: 60,
      backgroundColor: colors.colorCard,
    },
    pictureDescriptionContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    profilePicture: {
      color: colors.textMain,
      fontSize: 100,
    },
    descriptionText: {
      fontSize: 15,
      color: colors.textMain,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: "center",
      borderBottomColor: colors.colorLine,
      borderBottomWidth: 1,
      marginBottom: 10,
    },
    signupContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 10,
    },
    signUpIcon: {
      fontSize: 18,
      color: colors.textMuted,
      marginRight: 10,
    },
    signUpText: {
      color: colors.textMain,
      fontWeight: "bold",
    },
  });

  const handleSignupPress = () => {
    navigation.navigate("signupScreen");
  };

  return (
    <DrawerContentScrollView style={styles.mainContainer}>
      <View style={styles.pictureDescriptionContainer}>
        <Icon name="user" style={styles.profilePicture} />
        <Text style={styles.descriptionText}>
          Sign up to upvote the best content, customize your feed, share your
          interests, and more!
        </Text>
      </View>
      <DrawerItem
        icon={() => <Icon name="user-circle" style={styles.signUpIcon} />}
        label="Signup/Log in"
        labelStyle={styles.signUpText}
        onPress={handleSignupPress}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerSignedOut;
