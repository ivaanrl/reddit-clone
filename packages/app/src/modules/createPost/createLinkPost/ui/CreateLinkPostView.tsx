import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme, useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeColors } from "../../../../themes/themes";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-paper";
import Dimensions from "expo-constants";

interface Props {
  createPost: (
    subName: string,
    title: string,
    type: string,
    content?: string[] | undefined,
    link?: string | undefined
  ) => void;
}

const CreateLinkPostView = ({ createPost }: Props) => {
  const linkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const navigation = useNavigation();
  const route = useRoute();
  const [communityPicked, setCommunityPicked] = useState<string>(
    "Choose a community"
  );
  const [postButtonDisabled, setPostButtonDisabled] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (
      route.params &&
      (route.params as { communityPicked: string }).communityPicked
    ) {
      setCommunityPicked(
        (route.params as { communityPicked: string }).communityPicked
      );
    }
  }, [route.params]);

  useEffect(() => {
    if (
      communityPicked !== "Choose a community" &&
      title !== "" &&
      content !== "" &&
      content.match(linkRegex)
    ) {
      setPostButtonDisabled(false);
    } else {
      setPostButtonDisabled(true);
    }
  }, [title, communityPicked, content]);

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.colorCard,
      flex: 1,
    },
    communityPickContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderBottomColor: colors.colorLine,
      borderBottomWidth: 1,
    },
    communityPickIcon: {
      height: 30,
      width: 30,
      borderRadius: 100,
      backgroundColor: colors.highlightColor,
      marginRight: 10,
    },
    communityPickedText: {
      fontWeight: "bold",
      color: colors.textMain,
    },
    communityPickedPlaceholder: {
      color: colors.textMuted,
    },
    communityPickedTextContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    caretDown: {
      marginLeft: 5,
      color: colors.textMuted,
    },
    titleTextInput: {
      backgroundColor: colors.inputBackground,
      fontWeight: "bold",
      color: colors.textMain,
    },
    contentTextInput: {
      backgroundColor: colors.inputBackground,
      color: colors.textMain,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: Dimensions.statusBarHeight + 24,
    },
    cancelContainer: {
      marginLeft: 10,
    },
    cancelIcon: {
      fontSize: 30,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    headerButtonContainer: {
      padding: 10,
    },
    headerButtonText: {
      fontWeight: "bold",
    },
    headerButtonTextDisabled: {
      color: colors.textMuted,
      fontWeight: "bold",
    },
  });

  const handlePost = () => {
    createPost(communityPicked, title, "link", [], content);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.cancelContainer}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" style={styles.cancelIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Link Post</Text>
        <TouchableOpacity
          style={styles.headerButtonContainer}
          activeOpacity={1}
          onPress={handlePost}
        >
          <Text
            style={
              postButtonDisabled
                ? styles.headerButtonTextDisabled
                : styles.headerButtonText
            }
          >
            Post
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.communityPickContainer}
        onPress={() =>
          navigation.navigate("communityPicker", {
            previousRoute: "createLinkPost",
          })
        }
      >
        <View style={styles.communityPickIcon} />
        {communityPicked === "Choose a community" ? (
          <View style={styles.communityPickedTextContainer}>
            <Text style={styles.communityPickedPlaceholder}>
              {communityPicked}
            </Text>
            <Icon name="caret-down" style={styles.caretDown} />
          </View>
        ) : (
          <View style={styles.communityPickedTextContainer}>
            <Text style={styles.communityPickedText}>r/{communityPicked}</Text>
            <Icon name="caret-down" style={styles.caretDown} />
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.titleTextInput}
        placeholder="An interesting title"
        placeholderTextColor={colors.textMuted}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.contentTextInput}
        placeholder="https://"
        placeholderTextColor={colors.textMuted}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
    </View>
  );
};

export default CreateLinkPostView;
