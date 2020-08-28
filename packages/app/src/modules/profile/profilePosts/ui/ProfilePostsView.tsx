import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import PostConnector from "../../../post/PostConnector";
import { ScrollView } from "react-native-gesture-handler";

const ProfilePostsView = () => {
  const userProfile = useSelector((state: State) => state.profile);

  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default ProfilePostsView;