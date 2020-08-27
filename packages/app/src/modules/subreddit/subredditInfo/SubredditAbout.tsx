import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import SubredditMods from "./SubredditMods";

const SubredditAbout = () => {
  const { mods } = useSelector((state: State) => state.subreddit);

  return (
    <View>
      <SubredditMods mods={mods} />
    </View>
  );
};

export default SubredditAbout;
