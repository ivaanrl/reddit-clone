import React, { useState, useEffect } from "react";
import "./Vote.scss";

interface Props {
  id: number;
  index?: number;
  votes: number;
  user_vote: number;
  vote?: (id: number, voteValue: number, index: number) => void;
  voteFullPost?: (id: number, voteValue: number) => void;
  showCount: boolean;
}

const Vote = (props: Props) => {
  const { vote, id, index, votes, user_vote, voteFullPost, showCount } = props;
  const [upvoteActive, setUpvoteActive] = useState(false);
  const [downvoteActive, setDownvoteActive] = useState(false);
  const [voteCountClass, setVoteCountClass] = useState("vote-count");

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
    if (vote && index) {
      vote(voteValue, id, index);
    } else if (voteFullPost) {
      voteFullPost(voteValue, id);
    }

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
      {showCount ? (
        <div className={voteCountClass} title="vote-count">
          {votes}
        </div>
      ) : null}
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
  );
};

export default Vote;
