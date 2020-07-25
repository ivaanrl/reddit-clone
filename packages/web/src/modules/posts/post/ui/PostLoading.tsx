import React from "react";
import "./PostLoading.scss";
import Vote from "../../vote/Vote";

const PostLoading = () => {
  const mockVotePost = (
    id: string,
    voteValue: number,
    index: number,
    reducer: string
  ) => {};
  return (
    <div className="post-container">
      <Vote
        id=""
        votes={"0"}
        user_vote={0}
        votePost={mockVotePost}
        showCount={false}
        child={false}
        reducer=""
      />
      <div className="main-content">
        <div className="post-loading-info post-loading"></div>
        <div className="post-loading-title post-loading"></div>
        <div className="post-loading-content post-loading"></div>
      </div>
    </div>
  );
};

export default PostLoading;
