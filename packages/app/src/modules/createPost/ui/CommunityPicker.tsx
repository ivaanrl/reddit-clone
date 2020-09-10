import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme, useNavigation, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../../themes/themes";

const CommunityPicker = () => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const navigation = useNavigation();
  const route = useRoute();

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.colorCard,
      minHeight: "100%",
    },
    subredditContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      backgroundColor: colors.colorCard,
      width: "100%",
      paddingLeft: 10,
    },
    subredditPictureContainer: {
      marginRight: 10,
    },
    subredditPicturePlaceholder: {
      height: 30,
      width: 30,
      backgroundColor: colors.highlightSelection,
      borderRadius: 100,
    },
    subredditName: {
      fontWeight: "bold",
      fontSize: 16,
    },
    headerContainer: {
      backgroundColor: colors.colorLine,
      paddingVertical: 5,
      width: "120%",
    },
    headerText: {
      marginLeft: 13,
      fontSize: 12,
      fontWeight: "bold",
      color: colors.textMuted,
    },
  });

  const [prevRoute, setPrevRoute] = useState<string>("");

  useEffect(() => {
    if (
      route.params &&
      (route.params as { previousRoute: string }).previousRoute
    ) {
      setPrevRoute((route.params as { previousRoute: string }).previousRoute);
    }
  }, [route]);

  const userSubs = useSelector((state: State) => state.auth.userSubs);

  const handleClick = (name: string) => {
    console.log(prevRoute);
    navigation.navigate(prevRoute, { communityPicked: name });
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={styles.subredditContainer}
        key={index}
        onPress={() => handleClick(item.name)}
      >
        <View style={styles.subredditPictureContainer}>
          <View style={styles.subredditPicturePlaceholder} />
        </View>
        <Text style={styles.subredditName}> {item.name} </Text>
      </TouchableOpacity>
    );
  };

  const header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>JOINED</Text>
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={header}
      style={styles.mainContainer}
      data={userSubs}
      renderItem={renderItem}
    />
  );
};

export default CommunityPicker;
