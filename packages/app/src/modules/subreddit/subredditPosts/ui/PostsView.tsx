import React from "react";
import { State } from "@reddit-clone/controller";
import { useSelector } from "react-redux";
import PostConnector from "../../../post/PostConnector";
import { FlatList, Animated } from "react-native";
interface Props {
  scrollY: Animated.Value;
}

const PostsView = (props: Props) => {
  const { scrollY } = props;
  const subreddit = useSelector((state: State) => state.subreddit);

  const renderItem = ({ item, index }: any) => {
    return (
      <PostConnector
        postInfo={{ ...item, index }}
        reducer="subreddit"
        showSubredditName={false}
      />
    );
  };

  return (
    <FlatList
      scrollEventThrottle={1}
      data={subreddit.posts}
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
  );
};

export default PostsView;
