import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { darkTheme, lightTheme } from "./themes/themes";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  scheme: string | undefined | null;
  userAuth: {
    username: string;
    email: string;
    karma: number;
    userSubs: {
      name: string;
      adultContent: boolean;
    }[];
    message: {
      status: number;
      text: string;
    };
  };
}

const CustomDrawerContent = ({ scheme, userAuth }: Props) => {
  const { colors } = scheme === "dark" ? darkTheme : lightTheme;

  const styles = StyleSheet.create({
    mainContainer: {
      padding: 10,
      paddingTop: 50,
      borderWidth: 1,
      flex: 1,
    },
    pictureAndUserNameContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    profilePicture: {
      width: 70,
      height: 70,
      backgroundColor: colors.colorLine,
      borderRadius: 100,
    },
    usernameText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.textMain,
    },
    karmaAndCreatedContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      borderBottomColor: colors.colorLine,
      borderBottomWidth: 1,
    },
    karmaContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 15,
      paddingBottom: 15,
      flex: 1,
    },
    karmaIcon: {
      height: 20,
      width: 20,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: colors.highlightColor,
      marginRight: 10,
    },
    karmaAndCreatedTextContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    karmaAndCreatedText: {
      fontWeight: "bold",
      fontSize: 16,
    },
    karmaAndCreatedSubtext: {
      color: "grey",
      fontSize: 12,
    },
    navigationOptionsContainer: {
      flexGrow: 1,
    },
    navigationOptionContainer: {
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    navigationOptionIcon: {
      height: 10,
      width: 10,
    },
    navigationOptionText: {
      fontWeight: "bold",
      fontSize: 16,
    },
    iconStyle: {
      marginRight: 10,
      fontSize: 16,
      color: colors.textMuted,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.pictureAndUserNameContainer}>
        <View style={styles.profilePicture} />
        <Text style={styles.usernameText}>u/{userAuth.username}</Text>
      </View>
      <View style={styles.karmaAndCreatedContainer}>
        <View style={styles.karmaContainer}>
          <View style={styles.karmaIcon}></View>
          <View style={styles.karmaAndCreatedTextContainer}>
            <Text style={styles.karmaAndCreatedText}>{userAuth.karma}</Text>
            <Text style={styles.karmaAndCreatedSubtext}>Karma</Text>
          </View>
        </View>
        <View style={styles.karmaContainer}>
          <View style={styles.karmaIcon}></View>
          <View style={styles.karmaAndCreatedTextContainer}>
            <Text style={styles.karmaAndCreatedText}>4y</Text>
            <Text style={styles.karmaAndCreatedSubtext}>Reddit age</Text>
          </View>
        </View>
      </View>
      <View style={styles.navigationOptionsContainer}>
        <View style={styles.navigationOptionContainer}>
          <Icon name="users" style={styles.iconStyle} />
          <Text style={styles.navigationOptionText}>My profile</Text>
        </View>
        <View style={styles.navigationOptionContainer}>
          <Icon
            name="bookmark"
            style={{ ...styles.iconStyle, marginLeft: 2, marginRight: 13 }}
          />
          <Text style={styles.navigationOptionText}>Saved</Text>
        </View>
        <View style={styles.navigationOptionContainer}>
          <Icon name="slideshare" style={styles.iconStyle} />
          <Text style={styles.navigationOptionText}>Create a community</Text>
        </View>
        <View
          style={{
            ...styles.navigationOptionContainer,
            position: "absolute",
            bottom: 0,
          }}
        >
          <Icon name="sign-out" style={styles.iconStyle} />
          <Text style={styles.navigationOptionText}>Sign out</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
