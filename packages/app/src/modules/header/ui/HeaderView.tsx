import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBarConnector from "../searchBar/SearchBarConnector";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface Props {
  signoutUser: () => void;
  backButton: boolean;
}

const HeaderView = (props: Props) => {
  const { signoutUser, backButton } = props;

  const styles = StyleSheet.create({
    headerMainContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    profilePicPlaceholder: {
      width: 22,
      height: 22,
      backgroundColor: "blue",
      borderRadius: 100,
      marginRight: 15,
    },
  });

  const navigation = useNavigation();

  return (
    <View style={styles.headerMainContainer}>
      {backButton ? null : (
        <TouchableOpacity
          style={styles.profilePicPlaceholder}
          activeOpacity={1}
          onPress={() => (navigation as any).openDrawer()}
        />
      )}
      <SearchBarConnector />
    </View>
  );
};

export default HeaderView;
