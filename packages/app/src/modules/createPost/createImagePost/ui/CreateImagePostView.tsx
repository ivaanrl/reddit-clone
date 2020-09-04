import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useTheme, useNavigation, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../../../themes/themes";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-paper";
import Dimensions from "expo-constants";

interface Props {
  createImagePost: (post: {
    subName: string;
    title: string;
    type: string;
    image: FileList;
  }) => void;
}

const CreateImagePostView = ({ createImagePost }: Props) => {
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
  const [image, setImage] = useState<string>("");

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
    if (communityPicked !== "Choose a community" && title !== "") {
      setPostButtonDisabled(false);
    } else {
      setPostButtonDisabled(true);
    }
  }, [title, communityPicked]);

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
    imageDisplay: {
      aspectRatio: 16 / 9,
      width: "50%",
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
  useEffect(() => {
    async function getPermissionAsync() {
      await getPermission();
    }
    getPermissionAsync();
  }, []);

  const getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      await pickImage();
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePost = () => {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.cancelContainer}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" style={styles.cancelIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Text Post</Text>
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
            previousRoute: "createTextPost",
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
      <Image source={{ uri: image }} style={styles.imageDisplay} />
    </View>
  );
};

export default CreateImagePostView;
