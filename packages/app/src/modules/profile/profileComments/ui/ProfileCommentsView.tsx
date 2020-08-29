import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfileCommentConnector from "./profileComment/ProfileCommentConnector";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

interface Props {
  scrollY: Animated.Value<number>;
}

const ProfileCommentsView = ({ scrollY }: Props) => {
  const userProfile = useSelector((state: State) => state.profile);

  const renderItem = ({
    item,
    index,
  }: {
    item: {
      commentId: string;
      commentAuthorId: string;
      commentAuthorUsername: string;
      commentContent: string[];
      commentCreatedAt: string;
      commentVoteValue: number;
      postId: string;
      postSubredditName: string;
      postAuthorUsername: string;
      postTitle: string;
    };
    index: number;
  }) => {
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
    } = item;
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
  };

  return (
    <AnimatedFlatlist
      data={userProfile.comments}
      renderItem={renderItem}
      onScroll={Animated.event(
        [
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ],
        { useNativeDriver: false }
      )}
      keyExtractor={(item: any) => item.id}
    />
  );
};

export default ProfileCommentsView;

/*<ScrollView>
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
    </ScrollView>*/
