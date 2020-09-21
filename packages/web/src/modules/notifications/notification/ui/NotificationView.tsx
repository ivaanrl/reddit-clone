import React from "react";
import "./Notification.scss";
import { Notification } from "@reddit-clone/controller/dist/modules/Redux/reducers/notifications";
import { NavLink } from "react-router-dom";
import Vote from "../../../posts/vote/Vote";

interface Props {
  notificationInfo: Notification;
  formatDate: (date: string) => string;
  sanitizeContent: (
    content: string[]
  ) => {
    __html: string;
  };
  index: number;
  vote: (path: string[], voteValue: number) => void;
}

const NotificationView = ({
  notificationInfo,
  formatDate,
  sanitizeContent,
  vote,
  index,
}: Props) => {
  const {
    id,
    reply_id,
    original_id,
    author_id,
    subreddit_name,
    user_id,
    read,
    createdAt,
    updatedAt,
    comment_content,
    type,
    reply_author_username,
    reply_created_at,
    post_title,
    votes_value,
    user_vote,
  } = notificationInfo;

  const setAsRead = () => {};
  return (
    <div className="notification-main-container">
      <div className="notification-title">
        {type === "post" ? "Post " : "Comment "} Reply:{" "}
        <span>{post_title}</span>
      </div>
      <div className="notification-vote-and-content-container">
        <div className="notification-vote-container">
          <Vote
            id={id}
            index={index}
            votes={votes_value}
            showCount={false}
            child={false}
            reducer={"notification"}
            voteComment={vote}
            user_vote={user_vote}
          />
        </div>
        <div className="notification-original-post-container"></div>
        <div
          className={
            read
              ? "notification-reply-read-container"
              : "notification-reply-container"
          }
          onClick={setAsRead}
        >
          <div className="notification-from-container">
            <span>from</span>
            &nbsp;
            <NavLink to={`u/${reply_author_username}`}>
              u/{reply_author_username}
            </NavLink>
            &nbsp;
            <span>via</span>
            &nbsp;
            <NavLink to={`r/${subreddit_name}`}>r/{subreddit_name}</NavLink>
            &nbsp;
            <span>sent {formatDate(createdAt)}</span>
            {type === "comment" ? (
              <button className="notification-show-parent-button">
                Show Parent
              </button>
            ) : null}
          </div>
          <div className="notification-content-container">
            <div
              className="notification-content"
              dangerouslySetInnerHTML={sanitizeContent(comment_content)}
              title="notification-content"
            />
          </div>
          <div className="notification-buttons-container">
            <button className="notification-button">Original Post</button>
            {read ? (
              <button className="notification-button">Mark Unread</button>
            ) : null}
            <button className="notification-button">Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationView;
