import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import PostConnector from "../../../post/PostConnector";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { onScrollEvent } from "react-native-redash";

interface Props {
  scrollY: Animated.Value<number>;
}

const ProfilePostsView = ({ scrollY }: Props) => {
  const userProfile = useSelector((state: State) => state.profile);

  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ],
        { useNativeDriver: false }
      )}
    >
      {userProfile.posts.map((post, index) => {
        return (
          <PostConnector
            key={index}
            postInfo={{ ...post, index }}
            reducer="profile"
            showSubredditName={true}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default ProfilePostsView;
