import React, { useState, useEffect } from "react";
import "./Post.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allActions } from "@reddit-clone/controller";

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
    id: number;
    user_vote: number;
    index: number;
  };
  vote: (id: number, voteValue: number, index: number) => void;
}

const PostView = (props: Props) => {
  const dispatch = useDispatch();
  const [upvoteActive, setUpvoteActive] = useState(false);
  const [downvoteActive, setDownvoteActive] = useState(false);
  const [voteCountClass, setVoteCountClass] = useState("vote-count");
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
  } = props.postInfo;
  const { sanitizeContent, formatDate, vote } = props;

  useEffect(() => {
    if (user_vote === 1) {
      setUpvoteActive(true);
      setVoteCountClass("vote-count-upvote");
    } else if (user_vote === -1) {
      setDownvoteActive(true);
      setVoteCountClass("vote-count-downvote");
    }
  }, [user_vote]);

  const handleVote = (voteValue: number) => {
    vote(voteValue, id, index);
    if (voteValue === 1) {
      if (upvoteActive) {
        setVoteCountClass("vote-count");
      } else {
        setVoteCountClass("vote-count-upvote");
      }
      setUpvoteActive(!upvoteActive);
      setDownvoteActive(false);
    } else {
      downvoteActive
        ? setVoteCountClass("vote-count")
        : setVoteCountClass("vote-count-downvote");
      setUpvoteActive(false);
      setDownvoteActive(!downvoteActive);
    }
  };

  return (
    <div className="post-container">
      <div className="votes-sidebar">
        <div
          className="upvote-container"
          title="upvote-button"
          onClick={() => handleVote(1)}
        >
          <svg
            className={upvoteActive ? "upvote-active" : "upvote"}
            data-testid="upvote-svg"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="5.71429" y="4.73685" width="4.57143" height="9.26316" />
            <path d="M8 0L14.9282 7.5H1.0718L8 0Z" />
          </svg>
        </div>
        <div className={voteCountClass} title="vote-count">
          {votes}
        </div>
        <div
          className="downvote-container"
          title="downvote-button"
          onClick={() => handleVote(-1)}
        >
          <svg
            data-testid="downvote-svg"
            className={downvoteActive ? "downvote-active" : "downvote"}
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
        <div className="create-date" title="post-create-date">
          <div className="postedBy">Posted by </div>&nbsp;
          <NavLink to={`/u/${author_username}`} className="post-navlink">
            {author_username}
          </NavLink>
          &nbsp;
          <NavLink to={`/r/${subreddit_name}/${id}`} className="post-navlink">
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
