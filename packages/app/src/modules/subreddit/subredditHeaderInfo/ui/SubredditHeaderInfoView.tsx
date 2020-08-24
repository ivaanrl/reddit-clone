import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { useTheme } from "@react-navigation/native";
import { ThemeColors } from "../../../../themes/themes";
import { fontSizes } from "../../../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  joinOrLeaveSubreddit: (subName: string) => void;
}

const SubredditHeaderInfoView = (props: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const subreddit = useSelector((state: State) => state.subreddit);

  const {
    name,
    joined,
    isUserJoined,
    description,
    adultContent,
    topics,
  } = subreddit;

  const styles = StyleSheet.create({
    mainContainer: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 20,
      paddingBottom: 25,
    },
    subredditPicture: {
      borderRadius: 100,
      backgroundColor: "skyblue",
      height: 50,
      width: 50,
      position: "absolute",
      bottom: -5,
      left: 10,
    },
    subredditPictureContainer: {
      backgroundColor: colors.colorCard,
      height: 45,
    },
    infoContainer: {},
    nameAndButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    nameText: {
      ...fontSizes.subredditHeaderNameFont,
      color: colors.textMain,
      flex: 1,
    },
    buttonContainer: {
      height: 20,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.linkColor,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      color: colors.linkColor,
      fontWeight: "bold",
    },
    joinedButton: {},
    joinButton: {},
    membersContainer: { marginTop: 10 },
    membersText: {
      color: colors.textMuted,
    },
    descriptionContainer: { marginTop: 10 },
    descrptionText: {
      color: colors.textMain,
    },
    topicsContainer: {
      flexDirection: "row",
      marginTop: 10,
    },
    topicText: {
      color: colors.linkColorLight,
      backgroundColor: colors.colorCard,
      marginRight: 10,
      borderRadius: 4,
      padding: 2,
      paddingLeft: 5,
      paddingRight: 5,
    },
  });

  const handleJoinClick = () => {};

  const capitalizeWord = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <React.Fragment>
      <View style={styles.subredditPictureContainer}>
        <View style={styles.subredditPicture} />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.nameAndButtonContainer}>
          <Text style={styles.nameText}>r/{name}</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.button}>JOIN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.membersContainer}>
          <Text style={styles.membersText}>{joined} members</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descrptionText}>{description}</Text>
        </View>
        <View style={styles.topicsContainer}>
          {topics.map((topic: string, index: number) => {
            return (
              <Text style={styles.topicText} key={index}>
                {capitalizeWord(topic)}
              </Text>
            );
          })}
        </View>
      </View>
    </React.Fragment>
  );
};

export default SubredditHeaderInfoView;
