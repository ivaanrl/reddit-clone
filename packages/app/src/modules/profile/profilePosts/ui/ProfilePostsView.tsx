import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";

const ProfilePostsView = () => {
  const userProfile = useSelector((state: State) => state.profile);
  console.log(userProfile.posts);

  return <View></View>;
};

export default ProfilePostsView;
