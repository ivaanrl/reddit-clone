import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import SearchResult from "./SearchResult";
import { StackHeaderProps } from "@react-navigation/stack";

const SearchResultsScreen = () => {
  const searchResults = useSelector(
    (state: State) => state.search.searchPreviewResults
  );

  return (
    <View>
      {searchResults.map((result, index) => {
        const { memberCount, name, adultContent } = result;
        return (
          <SearchResult
            memberCount={memberCount}
            name={name}
            adultContent={adultContent}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default SearchResultsScreen;
