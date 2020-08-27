import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ThemeColors } from "../../../themes/themes";

interface Props {
  mods: string[];
}

const SubredditMods = (props: Props) => {
  const { mods } = props;
  const navigation = useNavigation();
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;

  const handleModPress = (mod: string) => {
    navigation.navigate("profile", { username: mod });
  };

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.colorCard,
    },
    headerContainer: {
      backgroundColor: colors.colorCard,
      margin: 15,
      paddingBottom: 10,
      marginBottom: 0,
      borderBottomWidth: 1,
      borderBottomColor: colors.colorLine,
    },
    headerText: {
      color: colors.textMain,
      fontWeight: "bold",
    },
    moderatorContainer: {
      backgroundColor: colors.colorCard,
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: 15,
    },
    moderatorText: {
      color: colors.textMain,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Moderators</Text>
      </View>

      {mods.map((mod: string, index: number) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handleModPress(mod)}
            key={index}
            style={styles.moderatorContainer}
          >
            <Text style={styles.moderatorText}>u/{mod}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SubredditMods;
