import React, { useState, useLayoutEffect } from "react";
import { State } from "@reddit-clone/controller";
import { useSelector } from "react-redux";
import PostConnector from "../../../post/PostConnector";
import {
  ScrollView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

interface Props {
  setHeight: React.Dispatch<React.SetStateAction<number>>;
}

const PostsView = (props: Props) => {
  const { setHeight } = props;
  const subreddit = useSelector((state: State) => state.subreddit);

  const renderItem = ({ item, index }: any) => {
    return (
      <React.Fragment>
        <PostConnector
          postInfo={{ ...item, index }}
          reducer="subreddit"
          showSubredditName={false}
        />
        <PostConnector
          postInfo={{ ...item, index }}
          reducer="subreddit"
          showSubredditName={false}
        />
        <PostConnector
          postInfo={{ ...item, index }}
          reducer="subreddit"
          showSubredditName={false}
        />
      </React.Fragment>
    );
  };

  const [scrollDistance, setScrollDistance] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollDistance = event.nativeEvent.contentOffset.y;
    //setScrollDistance(scrollDistance);
    if (scrollDistance > 200) {
      setHeight(0);
    } else {
      setHeight(200 - scrollDistance);
    }
  };

  return (
    <React.Fragment>
      <FlatList
        data={subreddit.posts}
        renderItem={renderItem}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </React.Fragment>
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
