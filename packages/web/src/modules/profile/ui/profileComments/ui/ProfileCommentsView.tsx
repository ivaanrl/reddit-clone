import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfileCommentConnector from "../profileComment/ProfileCommentConnector";

interface Props {
  getComments: (username: string) => void;
}

const ProfileCommentsView = (props: Props) => {
  const { getComments } = props;
  const location = useLocation();
  const profileComments = useSelector((state: State) => state.profile.comments);

  useEffect(() => {
    const username = location.pathname.split("/")[2];
    getComments(username);
  }, []);

  return (
    <div className="profile-container">
      {profileComments.map((comment) => {
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
          />
        );
      })}
    </div>
  );
};

export default ProfileCommentsView;
