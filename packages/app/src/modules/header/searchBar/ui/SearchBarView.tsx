import React, { useState, useEffect } from "react";
import {
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme, useNavigation, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../../../themes/themes";
import { inputStyles } from "../../../../styles";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  search: (searchValue: string) => void;
}

const SearchBarView = (props: Props) => {
  const { search } = props;
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const screenWidth = Math.round(Dimensions.get("window").width);

  const styles = StyleSheet.create({
    searchBarContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: screenWidth - 80,
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
      flex: 1,
    },
  });

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const params = route.params as { name: string };
    if (params && params.name !== "") {
      setSearchValue("r/" + params.name);
    }
  }, [route]);

  const handleSearchChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const searchValue = event.nativeEvent.text;
    setSearchValue(searchValue);
    if (searchValue.length > 0) {
      search(searchValue);
    }
  };

  const navigateToSearchResults = () => {
    navigation.navigate("searchResults");
  };

  return (
    <TouchableOpacity
      style={styles.searchBarContainer}
      onPress={navigateToSearchResults}
    >
      <View style={styles.searchBarIconContainer}>
        <Icon name="search" style={styles.searchBarIcon} />
      </View>

      <TextInput
        value={searchValue}
        onChange={handleSearchChange}
        style={styles.searchBarInput}
        placeholder="Search"
        placeholderTextColor={colors.textMuted}
        onFocus={navigateToSearchResults}
      />
    </TouchableOpacity>
  );
};

export default SearchBarView;
