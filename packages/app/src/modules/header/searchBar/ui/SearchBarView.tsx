import React, { useState } from "react";
import {
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { useTheme } from "@react-navigation/native";
import { ThemeColors } from "../../../../themes/themes";
import { inputStyles } from "../../../../styles";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  search: (searchValue: string) => void;
}

const SearchBarView = (props: Props) => {
  const { search } = props;
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;

  const styles = StyleSheet.create({
    searchBarContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    searchBarIconContainer: {
      backgroundColor: colors.inputBackground,
      height: 37,
      width: 25,
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
    searchBarIcon: {
      color: colors.textMuted,
    },
    searchBarInput: {
      ...inputStyles.input,
      backgroundColor: colors.inputBackground,
      color: colors.textMain,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      height: 37,
    },
  });

  const searchPreviewResults = useSelector(
    (state: State) => state.search.searchPreviewResults
  );

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setSearchValue(event.nativeEvent.text);
  };

  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBarIconContainer}>
        <Icon name="search" style={styles.searchBarIcon} />
      </View>
      <TextInput
        value={searchValue}
        onChange={handleSearchChange}
        style={styles.searchBarInput}
        placeholder="Search"
        placeholderTextColor={colors.textMuted}
      />
    </View>
  );
};

export default SearchBarView;
