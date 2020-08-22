import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { dropdownStyles } from "../../../styles";
import { ThemeColors } from "../../../themes/themes";
import { useSpring, animated } from "react-spring";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import Icon from "react-native-vector-icons/FontAwesome";
import HotSVG from "../../svgs/HotSVG";
import TopSVG from "../../svgs/TopSVG";
import NewSVG from "../../svgs/NewSVG";

interface Props {
  getPostsWithUsername?: (
    username: string,
    order: string,
    time: string,
    page: number
  ) => void;
  getPostsHomepage?: (order: string, time: string, page: number) => void;

  defaultSort: string;
  reducer: string;
}

const AnimatedView: any = animated(View);

const OrderBar = (props: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const statusBarHeight = Constants.statusBarHeight;
  const windowHeight = Dimensions.get("window").height;
  const {
    getPostsHomepage,
    //getPostsWithUsername,
    defaultSort,
    //reducer,
  } = props;

  const [activeOption, setActiveOption] = useState<string>(defaultSort);
  const [activeOptionIcon, setActiveOptionIcon] = useState(
    <HotSVG fillColor={colors.textMuted} />
  );

  const [timeSort, setTimeSort] = useState<string>("all_time");

  const styles = StyleSheet.create({
    container: {
      ...dropdownStyles.small,
      backgroundColor: colors.primary,
      justifyContent: "center",
      zIndex: 0,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5,
    },
    selectedOptionContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    selectedOption: {
      color: colors.textMuted,
      marginRight: 5,
    },
    dropdownOptionsContainer: {
      //...StyleSheet.absoluteFillObject,
      position: "absolute",
      left: 0,
      right: 0,
      marginRight: 10,
      marginLeft: 10,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      backgroundColor: colors.card,
    },
    dropdownOptionContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      marginRight: 10,
      marginLeft: 10,
    },
    dropdownOption: {
      backgroundColor: colors.card,
      alignSelf: "stretch",
      textAlign: "left",
      justifyContent: "center",
      marginLeft: 10,
    },
    dropdownOptionIconContainer: {
      width: 15,
      height: 15,
    },
    dropdownOptionTitle: {
      paddingLeft: 15,
      backgroundColor: colors.card,
      color: colors.textMuted,
      marginRight: 10,
      marginLeft: 10,
      fontWeight: "700",
      fontSize: 12,
      paddingBottom: 10,
      paddingTop: 10,
      borderColor: "transparent",
      borderBottomColor: colors.colorLine,
      borderWidth: 1,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    dropdownModal: {
      position: "absolute",
      height: windowHeight - statusBarHeight,
      width: "100%",
      backgroundColor: colors.modalColor,
      zIndex: 900,
    },
  });

  const [drodpdownOptionsVisible, setDropdownOptionsVisible] = useState<
    boolean
  >(false);

  const dropdownAnimationProps = useSpring({
    opacity: drodpdownOptionsVisible ? 1 : 0,
    bottom: drodpdownOptionsVisible ? 0 : -200,
  });

  const handleSelectClick = () => {
    setDropdownOptionsVisible(!drodpdownOptionsVisible);
  };

  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const homepagePage = useSelector((state: State) => state.homepage.page);

  useEffect(() => {
    if (getPostsHomepage) {
      getPostsHomepage(activeOption, timeSort, homepagePage);
    }
    switch (activeOption) {
      case "hot":
        setActiveOptionIcon(<HotSVG fillColor={colors.textMuted} />);
        break;
      case "top":
        setActiveOptionIcon(<TopSVG fillColor={colors.textMuted} />);
        break;
      case "new":
        setActiveOptionIcon(<NewSVG fillColor={colors.textMuted} />);
        break;
      default:
        setActiveOptionIcon(<HotSVG fillColor={colors.textMuted} />);
    }
  }, [activeOption, defaultSort]);

  const handleSelectDropdownOption = (selectedOption: string) => {
    setActiveOption(selectedOption);
    setDropdownOptionsVisible(false);
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleSelectClick}
          style={styles.selectedOptionContainer}
        >
          <View style={{ width: 15, height: 15, marginRight: 5 }}>
            {activeOptionIcon}
          </View>
          <Text style={styles.selectedOption}>
            {capitalizeString(activeOption)} posts
          </Text>
          <Icon name="caret-down" color={colors.textMuted} />
        </TouchableOpacity>
      </View>
      {drodpdownOptionsVisible ? (
        <TouchableOpacity
          style={styles.dropdownModal}
          onPress={handleSelectClick}
        >
          <AnimatedView
            style={{
              ...dropdownAnimationProps,
              ...styles.dropdownOptionsContainer,
            }}
          >
            <Text style={styles.dropdownOptionTitle}>SORT POST BY</Text>
            <TouchableOpacity
              onPress={() => handleSelectDropdownOption("hot")}
              style={styles.dropdownOptionContainer}
            >
              <View style={styles.dropdownOptionIconContainer}>
                <HotSVG
                  fillColor={
                    activeOption === "hot" ? colors.textMain : colors.textMuted
                  }
                />
              </View>
              <Text
                style={{
                  ...styles.dropdownOption,
                  color:
                    activeOption === "hot" ? colors.textMain : colors.textMuted,
                }}
              >
                Hot
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectDropdownOption("new")}
              style={styles.dropdownOptionContainer}
            >
              <View style={styles.dropdownOptionIconContainer}>
                <NewSVG
                  fillColor={
                    activeOption === "new" ? colors.textMain : colors.textMuted
                  }
                />
              </View>
              <Text
                style={{
                  ...styles.dropdownOption,
                  color:
                    activeOption === "new" ? colors.textMain : colors.textMuted,
                }}
              >
                New
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectDropdownOption("top")}
              style={styles.dropdownOptionContainer}
            >
              <View style={styles.dropdownOptionIconContainer}>
                <TopSVG
                  fillColor={
                    activeOption === "top" ? colors.textMain : colors.textMuted
                  }
                />
              </View>
              <Text
                style={{
                  ...styles.dropdownOption,
                  color:
                    activeOption === "top" ? colors.textMain : colors.textMuted,
                }}
              >
                Top
              </Text>
            </TouchableOpacity>
          </AnimatedView>
        </TouchableOpacity>
      ) : null}
    </React.Fragment>
  );
};

export default OrderBar;
