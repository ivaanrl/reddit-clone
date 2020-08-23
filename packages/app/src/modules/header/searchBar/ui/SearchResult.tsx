import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemeColors } from "../../../../themes/themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fontSizes } from "../../../../styles";

interface Props {
  name: string;
  adultContent: boolean;
  memberCount: number;
}

const SearchResult = (props: Props) => {
  const { name, adultContent, memberCount } = props;
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;

  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 20,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: colors.colorCard,
    },
    nameAndMemberCountContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginLeft: 10,
    },
    subredditNameContainer: {},
    subredditNameText: {
      color: colors.textMain,
      ...fontSizes.searchResultName,
    },
    memberCountContainer: {},
    memberCountText: {
      color: colors.textMuted,
    },
    subredditImageContainer: {
      width: 30,
      height: 30,
      borderRadius: 100,
      marginTop: 2,
      backgroundColor: "skyblue",
    },
  });

  return (
    <TouchableOpacity style={styles.mainContainer}>
      <View style={styles.subredditImageContainer} />
      <View style={styles.nameAndMemberCountContainer}>
        <View style={styles.subredditNameContainer}>
          <Text style={styles.subredditNameText}>r/{name} </Text>
        </View>
        <View style={styles.memberCountContainer}>
          <Text style={styles.memberCountText}>{memberCount} members</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResult;
