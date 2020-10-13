import React from "react";
import { FullPostController } from "@reddit-clone/controller";
import FullPostView from "./ui/FullPostView";
import SubredditSidebarConnector from "../subreddit/sidebar/SubredditSidebarConnector";

const FullPostConnector = () => {
  return (
    <FullPostController>
      {({
        getFullPost,
        vote,
        sanitizeContent,
        formatDate,
        comment,
        deletePost,
      }) => (
        <div className="main-container">
          <FullPostView
            getFullPost={getFullPost}
            vote={vote}
            sanitizeContent={sanitizeContent}
            formatDate={formatDate}
            comment={comment}
            deletePost={deletePost}
          />
          <div className="sidebar-contaier">
            <SubredditSidebarConnector />
          </div>
        </div>
      )}
    </FullPostController>
  );
};

export default FullPostConnector;
