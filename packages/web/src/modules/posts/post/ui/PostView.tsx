import React from "react";
import "./Post.scss";
import { NavLink } from "react-router-dom";
import Vote from "../../vote/Vote";

interface Props {
  sanitizeContent: (content: string[]) => { __html: string };
  formatDate: (date: string) => string;
  postInfo: {
    author_id: string;
    author_username: string;
    content: string[];
    createdAt: string;
    updatedAt: string;
    subreddit_name: string;
    votes: number;
    title: string;
    id: string;
    user_vote: number;
    index: number;
    comment_count: number;
  };
  vote: (id: string, voteValue: number, index: number) => void;
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
    user_vote,
    index,
    comment_count,
  } = props.postInfo;

  const { sanitizeContent, formatDate, vote } = props;

  return (
    <div className="post-container">
      <Vote
        id={id}
        index={index}
        votes={votes}
        user_vote={user_vote}
        votePost={vote}
        showCount={true}
        child={false}
      />
      <div className="main-content">
        <NavLink
          to={`/r/${subreddit_name}/post/${id}`}
          className="main-content"
        >
          <div className="create-date" title="post-create-date">
            <div className="postedBy">Posted by </div>&nbsp;
            <NavLink to={`/u/${author_username}`} className="post-navlink">
              {author_username}
            </NavLink>
            &nbsp;
            <NavLink
              to={`/r/${subreddit_name}/post/${id}`}
              className="post-navlink"
            >
              {formatDate(createdAt)}
            </NavLink>
          </div>
          <div className="title" title="post-title">
            {title}
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={sanitizeContent(content)}
            title="post-content"
          />
        </NavLink>
        <div className="bottom-bar">
          <NavLink
            to={`/r/${subreddit_name}/post/${id}`}
            className="comments bottom-bar-container"
          >
            <i className="fa fa-comment  bottom-bar-icon" />
            <div className="text">{comment_count} comments</div>
          </NavLink>
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
