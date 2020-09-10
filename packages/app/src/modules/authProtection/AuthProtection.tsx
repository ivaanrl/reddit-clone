import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { ThemeColors } from "../../themes/themes";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";

const AuthProtection = () => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.colorBackground,
    },
    headerContainer: {
      backgroundColor: colors.colorCard,
      paddingTop: Constants.statusBarHeight + 24,
      flexDirection: "row",
      alignItems: "center",
    },
    headerIcon: {
      fontSize: 22,
      margin: 10,
    },
    headerText: {
      fontWeight: "bold",
      fontSize: 18,
      marginLeft: 5,
    },
    imageContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    image: {
      borderRadius: 100,
      maxWidth: "75%",
      maxHeight: "55%",
    },
    imageTextContainer: {
      width: "100%",
      alignItems: "center",
    },
    imageText: {
      fontWeight: "700",
      fontSize: 18,
      textAlign: "center",
      marginTop: 10,
    },
    buttonsContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-around",
    },
    buttonContainer: {
      backgroundColor: colors.highlightSelection,
      padding: 10,
      paddingHorizontal: 50,
      borderRadius: 100,
    },
    button: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" style={styles.headerIcon} />
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 30 }}
        >
          <Icon name="user" style={styles.headerIcon} />
          <Text style={styles.headerText}>Join Reddit</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/upvotes.jpg")}
          style={styles.image}
        />
        <View style={styles.imageTextContainer}>
          <Text style={styles.imageText}>
            Sign up to upvote the {"\n"} best content.
          </Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("signinScreen")}
        >
          <Text style={styles.button}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("signupScreen")}
        >
          <Text style={styles.button}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthProtection;
