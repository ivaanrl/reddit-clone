import React from "react";
import { FullPostController } from "@reddit-clone/controller";
import FullPostView from "./ui/FullPostView";

const FullPostConnector = () => {
  return (
    <FullPostController>
      {({ getFullPost, vote, sanitizeContent, formatDate, comment }) => (
        <FullPostView
          getFullPost={getFullPost}
          vote={vote}
          sanitizeContent={sanitizeContent}
          formatDate={formatDate}
          comment={comment}
        />
      )}
    </FullPostController>
  );
};

export default FullPostConnector;
