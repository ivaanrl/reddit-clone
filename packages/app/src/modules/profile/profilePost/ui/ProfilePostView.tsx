import React from "react";
import { View } from "react-native";

interface Props {
  formatDate: (date: string) => string;
  vote: (id: string, voteValue: number, index: number, reducer: string) => void;
}

const ProfilePostView = (props: Props) => {
  return <View />;
};

export default ProfilePostView;
