import React, { useState } from "react";
import "./Notification.scss";
import { Notification } from "@reddit-clone/controller";
import { NavLink, useHistory } from "react-router-dom";
import Vote from "../../../posts/vote/Vote";
import TextEditor from "../../../../shared/TextEditor";
import { HTMLSerializer } from "../../../../shared/HTMLSerializer";

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
  comment: (postId: string, content: string[]) => void;
}

const NotificationView = ({
  notificationInfo,
  formatDate,
  sanitizeContent,
  vote,
  index,
  comment,
}: Props) => {
  const {
    id,
    reply_id,
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
    post_id,
    reply_path,
  } = notificationInfo;
  const history = useHistory();
  const [showParent, setShowParent] = useState<boolean>(false);

  const [showTextEditor, setShowTextEditor] = useState<boolean>(false);
  const [textEditor, setTextEditor] = useState<any>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const handleComment = () => {
    if (textEditor[0].children[0].text === "") return;
    const serialized: string[][] = [];
    textEditor.forEach((node: Node) => {
      serialized.push(HTMLSerializer(node));
    });

    const formatted = serialized.map((arr) => {
      return arr.join("||");
    });

    comment(reply_id, formatted);
    setShowTextEditor(false);
    setTextEditor([
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ]);
  };

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
            path={reply_path.split(".")}
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
            <button
              className="notification-button"
              onClick={() =>
                history.push(`/r/${subreddit_name}/post/${post_id}`)
              }
            >
              Original Post
            </button>
            {read ? (
              <button className="notification-button">Mark Unread</button>
            ) : null}
            <button
              className="notification-button"
              onClick={() => setShowTextEditor(!showTextEditor)}
            >
              Reply
            </button>
          </div>
          {showTextEditor ? (
            <div className="notification-comment-text-editor-container">
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

export default NotificationView;
