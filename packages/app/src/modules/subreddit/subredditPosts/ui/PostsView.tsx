import React, { useState, useLayoutEffect } from "react";
import { State } from "@reddit-clone/controller";
import { useSelector } from "react-redux";
import PostConnector from "../../../post/PostConnector";
import {
  ScrollView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import SubredditHeaderInfoConnector from "../../subredditHeaderInfo/SubredditHeaderInfoConnector";

interface Props {
  setHeaderHeight: any;
  currentHeight: number;
}

const PostsView = (props: Props) => {
  const { setHeaderHeight, currentHeight } = props;
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

  const [scrollDistance, setScrollDistance] = useState(0);
  let prevValue = 200;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollDistance = event.nativeEvent.contentOffset.y;
    if (scrollDistance > 200) {
      setHeaderHeight({ height: 0 });
    } else {
      if (
        event.nativeEvent.velocity &&
        event.nativeEvent.velocity.y > 3 &&
        !(event.nativeEvent.velocity.y < 0)
      ) {
        setHeaderHeight({ height: 0 });
        return;
      }
      setHeaderHeight({ height: (200 - scrollDistance) / 200 });
    }
  };

  return (
    <FlatList
      scrollEventThrottle={1}
      data={subreddit.posts}
      renderItem={renderItem}
      onScroll={handleScroll}
    />
  );
};

export default PostsView;

/*
<ScrollView >
      {subreddit.posts.map((post, index) => {
        return (
          <PostConnector
            key={index}
            postInfo={{ ...post, index }}
            showSubredditName={false}
            reducer="subreddit"
          />
        );
      })}
      {subreddit.posts.map((post, index) => {
        return (
          <PostConnector
            key={index}
            postInfo={{ ...post, index }}
            showSubredditName={false}
            reducer="subreddit"
          />
        );
      })}
    </ScrollView>
    */

/*
<FlatList
        scrollEventThrottle={16}
        data={subreddit.posts}
        renderItem={renderItem}
        onScroll={handleScroll}
      />
 */
