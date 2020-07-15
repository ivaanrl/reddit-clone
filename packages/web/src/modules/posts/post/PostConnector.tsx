import React from "react";
import { PostController } from "@reddit-clone/controller";
import PostView from "./ui/PostView";

interface Props {
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
}

const PostConnector = (props: Props) => {
  return (
    <PostController>
      {({ sanitizeContent, formatDate, vote }) => (
        <PostView
          postInfo={props.postInfo}
          formatDate={formatDate}
          sanitizeContent={sanitizeContent}
          vote={vote}
        />
      )}
    </PostController>
  );
};

export default PostConnector;
