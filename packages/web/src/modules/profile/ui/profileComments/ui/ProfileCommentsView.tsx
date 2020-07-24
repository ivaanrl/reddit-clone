import React from "react";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfileCommentConnector from "../profileComment/ProfileCommentConnector";
import ProfileOrderCommentsBarConnector from "./ProfileOrderCommentsBarConnector";

const ProfileCommentsView = () => {
  const profileComments = useSelector((state: State) => state.profile.comments);

  return (
    <div className="profile-container">
      <ProfileOrderCommentsBarConnector />
      {profileComments.map((comment, index) => {
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
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ProfileCommentsView;
