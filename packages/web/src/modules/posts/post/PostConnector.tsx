import React from "react";
import { PostController } from "@reddit-clone/controller";
import PostView from "./ui/PostView";

export interface Props {
  postInfo: {
    author_id: string;
    author_username: string;
    content: string[] | null;
    createdAt: string;
    updatedAt: string;
    subreddit_name: string;
    votes: string;
    title: string;
    id: string;
    user_vote: number;
    index: number;
    comment_count: number;
    link: string | null;
    type: string;
    saved: boolean;
  };
  reducer: string;
  showSubredditName: boolean;
}

const PostConnector = (props: Props) => {
  return (
    <PostController>
      {({ sanitizeContent, formatDate, vote, save }) => (
        <PostView
          postInfo={props.postInfo}
          formatDate={formatDate}
          sanitizeContent={sanitizeContent}
          vote={vote}
          showSubredditName={props.showSubredditName}
          reducer={props.reducer}
          save={save}
        />
      )}
    </PostController>
  );
};

export default PostConnector;
