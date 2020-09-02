import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeColors } from "../../../../themes/themes";

interface Props {
  createPost: (
    subName: string,
    title: string,
    type: string,
    content?: string[],
    link?: string
  ) => void;
}

const CreateTextPostView = ({ createPost }: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.colorCard,
      flex: 1,
      marginTop: 100,
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

export default CreateTextPostView;
