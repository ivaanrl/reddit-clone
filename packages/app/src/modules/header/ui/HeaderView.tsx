import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBarConnector from "../searchBar/SearchBarConnector";

interface Props {
  signoutUser: () => void;
}

const HeaderView = (props: Props) => {
  const { signoutUser } = props;

  return (
    <View>
      <SearchBarConnector />
    </View>
  );
};

export default HeaderView;
