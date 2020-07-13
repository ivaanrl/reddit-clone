import React, { useState } from "react";
import "./ProfileComment.scss";
import { NavLink } from "react-router-dom";
import TextEditor from "../../../../../../shared/TextEditor";

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
  formatDate: (date: string) => string;
  sanitizeContent: (content: string[]) => { __html: string };
}

const ProfileCommentView = (props: Props) => {
  const {
    commentId,
    commentAuthorId,
    commentAuthorUsername,
    commentContent,
    commentCreatedAt,
    commentVoteValue,
    postId,
    postAuthorUsername,
    postSubredditName,
    postTitle,
    formatDate,
    sanitizeContent,
  } = props;

  const [textEditor, setTextEditor] = useState<any>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const [showTextEditor, setShowTextEditor] = useState(false);

  const handleComment = () => {};

  return (
    <div className="profile-comment-container">
      <div className="profile-parent-post-info">
        <i className="fa fa-comment profile-parent-post-comment-icon" />
        <div className="profile-parent-post-username">
          {commentAuthorUsername}
        </div>
        &nbsp;
        <div className="profile-parent-post-commented-on">commented on</div>
        &nbsp;
        <NavLink
          to={`/r/${postSubredditName}/post/${postId}`}
          className="profile-parent-post-title"
        >
          {postTitle}
        </NavLink>
        &nbsp;
        <NavLink
          to={`/r/${postSubredditName}`}
          className="profile-parent-post-subreddit"
        >
          r/{postSubredditName}
        </NavLink>
        &nbsp;
        <div className="profile-parent-post-postedby">
          Posted by &nbsp;
          <NavLink to={`/u/${postAuthorUsername}`}>
            u/{postAuthorUsername}
          </NavLink>
        </div>
      </div>
      <div className="profile-comment">
        <div className="profile-comment-lines" />
        <div className="profile-comment-info-container">
          <div className="profile-comment-info">
            <div className="profile-comment-username">
              {commentAuthorUsername}
            </div>
            &nbsp;
            <div className="profile-comment-votes">
              {commentVoteValue} points
            </div>
            &nbsp;
            <div className="profile-comment-date">
              {formatDate(commentCreatedAt)}
            </div>
          </div>
          <div
            className="profile-comment-content"
            dangerouslySetInnerHTML={sanitizeContent(commentContent)}
          />
          <div className="profile-bottom-bar">
            <div
              className="reply profile-bottom-bar-option"
              onClick={() => setShowTextEditor(!showTextEditor)}
            >
              Reply
            </div>
            <div className="save profile-bottom-bar-option">Save</div>
          </div>
          {process.env.NODE_ENV !== "test" && showTextEditor ? (
            <div className="profile-comment-text-editor-container">
              <TextEditor
                value={textEditor}
                setValue={setTextEditor}
                topBar={false}
                placeholder="What are your thoughts?"
                comment={handleComment}
                cancel={setShowTextEditor}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileCommentView;