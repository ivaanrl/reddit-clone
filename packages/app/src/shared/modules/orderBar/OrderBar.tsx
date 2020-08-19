import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { dropdownStyles } from "../../../styles";
import { ThemeColors } from "../../../themes/themes";
import { useSpring, animated } from "react-spring";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";

import superagent from "superagent";

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
  const statusBarHeight = Constants.statusBarHeight;
  const screenHeight = Dimensions.get("screen").height;
  const windowHeight = Dimensions.get("window").height;
  const colors = theme.colors as ThemeColors;
  const {
    getPostsHomepage,
    //getPostsWithUsername,
    defaultSort,
    //reducer,
  } = props;

  const sendReq = async () => {
    let response;
    try {
      response = await superagent
        .agent()
        .withCredentials()
        .get("https://192.168.0.45:5000/api" + "/homepage/getPosts")
        .query({});
    } catch (error) {
      //console.log(error);
      response = error;
    }
    //console.log(response);
    return response;
  };
  sendReq();

  const [activeOption, setActiveOption] = useState<string>(defaultSort);

  const styles = StyleSheet.create({
    container: {
      ...dropdownStyles.small,
      backgroundColor: colors.primary,
      justifyContent: "center",
      zIndex: 0,
    },
    selectedOption: {
      color: colors.text,
    },
    dropdownOptionContainer: {
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
    dropdownOption: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      backgroundColor: colors.card,
      color: colors.textMain,
      marginRight: 10,
      marginLeft: 10,
      alignSelf: "stretch",
      textAlign: "left",
      justifyContent: "center",
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
    position: "absolute",
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
    const timeSort = "all_time"; //Have to set this up later
    const sortOrder = ""; //Have to set this up later

    if (getPostsHomepage) {
      console.log("gonna send request");
      getPostsHomepage(activeOption, timeSort, homepagePage);
    }
  }, [activeOption, defaultSort]);

  return (
    <React.Fragment>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleSelectClick}>
          <Text style={styles.selectedOption}>
            {" "}
            {capitalizeString(activeOption)}
          </Text>
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
              ...styles.dropdownOptionContainer,
            }}
          >
            <Text style={styles.dropdownOptionTitle}>SORT POST BY</Text>
            <Text style={styles.dropdownOption} onPress={handleSelectClick}>
              Hot
            </Text>
            <Text style={styles.dropdownOption}>New</Text>
            <Text style={styles.dropdownOption}>Top</Text>
          </AnimatedView>
        </TouchableOpacity>
      ) : null}
    </React.Fragment>
  );
};

export default OrderBar;
