import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { darkTheme, lightTheme } from "./themes/themes";

interface Props {
  scheme: string;
}

const CustomDrawerContent = ({ scheme }: Props) => {
  const { colors } = scheme === "dark" ? darkTheme : lightTheme;

  const styles = StyleSheet.create({
    mainContainer: {
      padding: 10,
      paddingTop: 50,
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
    navigationOptionsContainer: {},
    navigationOptionContainer: {
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
      fontSize: 14,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.pictureAndUserNameContainer}>
        <View style={styles.profilePicture} />
        <Text style={styles.usernameText}>u/Ivaanrl</Text>
      </View>
      <View style={styles.karmaAndCreatedContainer}>
        <View style={styles.karmaContainer}>
          <View style={styles.karmaIcon}></View>
          <View style={styles.karmaAndCreatedTextContainer}>
            <Text style={styles.karmaAndCreatedText}>3000</Text>
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
          <View style={styles.navigationOptionIcon}></View>
          <Text style={styles.navigationOptionText}>My profile</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
