import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { ThemeColors } from "../../../themes/themes";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  createPost: (
    subName: string,
    title: string,
    type: string,
    content?: string[],
    link?: string
  ) => void;
  createImagePost: (post: {
    subName: string;
    title: string;
    type: string;
    image: FileList;
  }) => void;
}

const CreatePostView = ({ createImagePost, createPost }: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.colorCard,
      flex: 1,
    },
    communityPickContainer: {},
    communityPickIcon: {},
    communityPickText: {},
    titleContainer: {},
    contentContainer: {},
  });

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.communityPickContainer}
        onPress={() => navigation.navigate("communityPicker")}
      >
        <View style={styles.communityPickIcon} />
        <Text style={styles.communityPickText}>hola</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostView;
