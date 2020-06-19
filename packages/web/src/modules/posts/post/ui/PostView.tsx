import React from "react";
import "./Post.scss";
import { NavLink } from "react-router-dom";

interface Props {
  sanitizeContent: (content: string[]) => { __html: string };
  formatDate: (date: string) => string;
  postInfo: {
    author_id: string;
    author_username: string;
    content: string[];
    createdAt: string;
    updatedAt: string;
    subreddit_id: number;
    subreddit_name: string;
    votes: number;
    title: string;
    id: number;
  };
}

const PostView = (props: Props) => {
  const {
    author_username,
    content,
    createdAt,
    subreddit_name,
    votes,
    title,
    id,
  } = props.postInfo;
  const { sanitizeContent, formatDate } = props;

  return (
    <div className="post-container">
      <div className="votes-sidebar">
        <div className="upvote-container">
          <svg
            className="upvote"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="5.71429" y="4.73685" width="4.57143" height="9.26316" />
            <path d="M8 0L14.9282 7.5H1.0718L8 0Z" />
          </svg>
        </div>
        <div className="vote-count">{votes}</div>
        <div className="downvote-container">
          <svg
            className="downvote"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="5.71429" y="4.73685" width="4.57143" height="9.26316" />
            <path d="M8 0L14.9282 7.5H1.0718L8 0Z" />
          </svg>
        </div>
      </div>
      <div className="main-content">
        <div className="create-date">
          <div className="postedBy">Posted by </div>&nbsp;
          <NavLink to={`/u/${author_username}`} className="post-navlink">
            {author_username}
          </NavLink>
          &nbsp;
          <NavLink to={`/r/${subreddit_name}/${id}`} className="post-navlink">
            {formatDate(createdAt)}
          </NavLink>
        </div>
        <div className="title">{title}</div>
        <div
          className="content"
          dangerouslySetInnerHTML={sanitizeContent(content)}
        />
        <div className="bottom-bar">
          <div className="comments bottom-bar-container">
            <i className="fa fa-comment  bottom-bar-icon" />
            <div className="text">X comments</div>
          </div>
          <div className="save bottom-bar-container">
            <i className="fa fa-bookmark bottom-bar-icon" />
            <div className="text">Save</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
