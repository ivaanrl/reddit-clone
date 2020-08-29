import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import PostConnector from "../../../post/PostConnector";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { onScrollEvent } from "react-native-redash";

interface Props {
  scrollY: Animated.Value<number>;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ProfilePostsView = ({ scrollY }: Props) => {
  const userProfile = useSelector((state: State) => state.profile);

  const renderItem = ({ item, index }: any) => {
    return (
      <PostConnector
        key={index}
        postInfo={{ ...item, index }}
        reducer="profile"
        showSubredditName={true}
      />
    );
  };

  return (
    <View>
      <AnimatedFlatList
        data={userProfile.posts}
        renderItem={renderItem}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
};

export default ProfilePostsView;
