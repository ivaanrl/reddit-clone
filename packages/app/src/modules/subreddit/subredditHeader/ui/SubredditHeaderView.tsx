import React from "react";
import { View } from "react-native";
import SearchBarConnector from "../../../header/searchBar/SearchBarConnector";

interface Props {
  joinOrLeaveSubreddit: (subName: string) => void;
}

const SubredditHeaderView = (props: Props) => {
  return (
    <View>
      <SearchBarConnector />
    </View>
  );
};

export default SubredditHeaderView;
