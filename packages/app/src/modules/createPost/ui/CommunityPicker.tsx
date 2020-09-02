import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { FlatList } from "react-native-gesture-handler";

const CommunityPicker = () => {
  const styles = StyleSheet.create({
    mainContainer: {},
    subredditContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    subredditPictureContainer: {},
    subredditPicturePlaceholder: {
      height: 30,
      width: 30,
    },
    subredditName: {
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  const userSubs = useSelector((state: State) => state.auth.userSubs);

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.subredditContainer}>
        <View style={styles.subredditPictureContainer}>
          <View style={styles.subredditPicturePlaceholder} />
        </View>
        <Text style={styles.subredditName}> {item.name} </Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={userSubs} renderItem={renderItem} />
    </View>
  );
};

export default CommunityPicker;
