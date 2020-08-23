import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBarConnector from "../searchBar/SearchBarConnector";

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

  return (
    <View style={styles.headerMainContainer}>
      {backButton ? null : <View style={styles.profilePicPlaceholder} />}
      <SearchBarConnector />
    </View>
  );
};

export default HeaderView;
