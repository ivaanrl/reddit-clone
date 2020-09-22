import React, { useState } from "react";
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
    //reply_id,
    //original_id,
    //author_id,
    subreddit_name,
    //user_id,
    read,
    comment_content,
    reply_content,
    type,
    reply_author_username,
    reply_created_at,
    post_title,
    votes_value,
    user_vote,
  } = notificationInfo;
  const [showParent, setShowParent] = useState<boolean>(false);

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
            <NavLink to={`/u/${reply_author_username}`}>
              u/{reply_author_username}
            </NavLink>
            &nbsp;
            <span>via</span>
            &nbsp;
            <NavLink to={`/r/${subreddit_name}`}>r/{subreddit_name}</NavLink>
            &nbsp;
            <span>sent {formatDate(reply_created_at)}</span>
            {type === "comment" ? (
              <button
                className="notification-show-parent-button"
                onClick={() => setShowParent(!showParent)}
              >
                {showParent ? "Hide Parent" : "Show Parent"}
              </button>
            ) : null}
          </div>
          {showParent ? (
            <div className="notification-original-post-container">
              <div
                className="notification-original-post-content"
                dangerouslySetInnerHTML={sanitizeContent(comment_content)}
              ></div>
            </div>
          ) : null}
          <div className="notification-content-container">
            <div
              className="notification-content"
              dangerouslySetInnerHTML={sanitizeContent(reply_content)}
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
