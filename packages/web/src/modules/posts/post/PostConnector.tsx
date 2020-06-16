import React from "react";
import { PostController } from "@reddit-clone/controller";
import PostView from "./ui/PostView";

interface Props {
  postInfo: {
    author_id: string;
    author_username: string;
    content: string[];
    createdAt: Date;
    updatedAt: Date;
    subreddit_id: number;
    votes: number;
    title: string;
    id: number;
  };
}

const PostConnector = (props: Props) => {
  return (
    <PostController>
      {({ sanitizeContent }) => (
        <PostView postInfo={props.postInfo} sanitizeContent={sanitizeContent} />
      )}
    </PostController>
  );
};

export default PostConnector;
