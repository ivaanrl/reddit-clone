import React from "react";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfileCommentConnector from "../profileComment/ProfileCommentConnector";
import ProfileOrderCommentsBarConnector from "./ProfileOrderCommentsBarConnector";
import ProfilePostLoading from "../../../profilePost/ui/ProfilePostLoading";

const ProfileCommentsView = () => {
  const profileComments = useSelector((state: State) => state.profile.comments);
  const { isLoading, hasMore } = useSelector((state: State) => state.profile);

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
      {isLoading && hasMore ? (
        <React.Fragment>
          <ProfilePostLoading />
          <ProfilePostLoading />
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default ProfileCommentsView;
