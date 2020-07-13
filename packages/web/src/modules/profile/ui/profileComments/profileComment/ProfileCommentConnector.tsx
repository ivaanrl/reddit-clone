import React from "react";
import { ProfileCommentController } from "@reddit-clone/controller";
import ProfileCommentView from "./ui/ProfileCommentView";

interface Props {
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
}

const ProfileCommentConnector = (props: Props) => {
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
  } = props;

  return (
    <ProfileCommentController>
      {({ formatDate, sanitizeContent, comment }) => (
        <ProfileCommentView
          comment={comment}
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
          formatDate={formatDate}
          sanitizeContent={sanitizeContent}
        />
      )}
    </ProfileCommentController>
  );
};

export default ProfileCommentConnector;
