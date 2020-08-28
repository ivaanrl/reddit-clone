import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfileCommentConnector from "./profileComment/ProfileCommentConnector";
import { ScrollView } from "react-native-gesture-handler";

const ProfileCommentsView = () => {
  const userProfile = useSelector((state: State) => state.profile);
  console.log("profile yay", userProfile.comments);
  return (
    <ScrollView>
      {userProfile.comments.map((comment, index) => {
        const {
          commentId,
          commentAuthorId,
          commentAuthorUsername,
          commentContent,
          commentCreatedAt,
          commentVoteValue,
          postId,
          postSubredditName,
          postAuthorUsername,
          postTitle,
        } = comment;

        return (
          <ProfileCommentConnector
            key={index}
            commentId={commentId}
            commentAuthorId={commentAuthorId}
            commentAuthorUsername={commentAuthorUsername}
            commentContent={commentContent}
            commentCreatedAt={commentCreatedAt}
            commentVoteValue={commentVoteValue}
            postAuthorUsername={postAuthorUsername}
            postId={postId}
            postSubredditName={postSubredditName}
            postTitle={postTitle}
          />
        );
      })}
    </ScrollView>
  );
};

export default ProfileCommentsView;
