import React, { useRef } from "react";
import Animated, {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useTheme, useNavigation } from "@react-navigation/native";
import { ThemeColors } from "../../../themes/themes";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  bottomPosition: number;
  hideMenu: () => void;
}

const CreatePostSlideMenu = React.forwardRef(
  ({ bottomPosition, hideMenu }: Props, ref) => {
    const theme = useTheme();
    const colors = theme.colors as ThemeColors;
    const navigation = useNavigation();

    const transition = <Transition.Change interpolation="easeInOut" />;

    const styles = StyleSheet.create({
      mainContainer: {
        backgroundColor: colors.highlightSelection,
        alignItems: "center",
      },
      optionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 5,
      },
      optionContainer: {
        justifyContent: "center",
        alignItems: "center",
      },
      iconContainer: {
        height: 40,
        width: 40,
        backgroundColor: "white",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
      },
      icon: {
        fontSize: 25,
      },
      optionText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
      },
      cancelContainer: {
        width: "100%",
        alignItems: "center",
      },
      cancelIcon: {
        fontSize: 28,
        color: "white",
      },
    });

    return (
      <Transitioning.View
        ref={ref}
        transition={transition}
        style={{
          position: "absolute",
          bottom: bottomPosition,
          left: 0,
          right: 0,
        }}
      >
        <View style={{ ...styles.mainContainer }}>
          <Text
            style={{ ...styles.optionText, fontSize: 14, marginVertical: 10 }}
          >
            Post to Reddit
          </Text>
          <View style={{ ...styles.optionsContainer }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={hideMenu}
              style={styles.optionContainer}
            >
              <View style={styles.iconContainer}>
                <Icon name="link" style={styles.icon} />
              </View>
              <Text style={styles.optionText}>LINK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={hideMenu}
              style={styles.optionContainer}
            >
              <View style={styles.iconContainer}>
                <MaterialIcon name="image" style={styles.icon} />
              </View>
              <Text style={styles.optionText}>IMAGE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate("createTextPost");
                hideMenu();
              }}
              style={styles.optionContainer}
            >
              <View style={styles.iconContainer}>
                <Icon
                  name="file-text"
                  style={{ ...styles.icon, fontSize: 20 }}
                />
              </View>
              <Text style={styles.optionText}>TEXT</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={hideMenu}
            style={styles.cancelContainer}
          >
            <Icon style={styles.cancelIcon} name="close" />
          </TouchableOpacity>
        </View>
      </Transitioning.View>
    );
  }
);

export default CreatePostSlideMenu;
