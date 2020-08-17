import React, { useState } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { dropdownStyles } from "../../../styles";
import { ThemeColors } from "../../../themes/themes";

interface Props {
  /*getPostsWithUsername?: (
    username: string,
    order: string,
    time: string,
    page: number
  ) => void;
  getPostsHomepage?: (order: string, time: string, page: number) => void; */

  defaultSort: string;
  //reducer: string;
}

const OrderBar = (props: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const {
    //getPostsHomepage,
    //getPostsWithUsername,
    defaultSort,
    //reducer,
  } = props;

  const [activeOption, setActiveOption] = useState(defaultSort);

  const styles = StyleSheet.create({
    container: {
      ...dropdownStyles.small,
      color: "white",
    },
  });

  return (
    <View style={{ backgroundColor: colors.primary }}>
      <Picker
        selectedValue={"new"}
        mode="dialog"
        style={styles.container}
        itemStyle={{ backgroundColor: colors.card, color: colors.text }}
      >
        <Picker.Item label="New" value="new" />
        <Picker.Item label="Hot" value="hot" />
        <Picker.Item label="Top" value="top" />
      </Picker>
    </View>
  );
};

export default OrderBar;
