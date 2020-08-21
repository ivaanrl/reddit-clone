import React from "react";
import { View } from "react-native";

interface Props {
  sanitizeContent: (content: string[] | null) => { __html: string };
  formatDate: (date: string) => string;
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
  };
  reducer: string;
  vote: (id: string, voteValue: number, index: number, reducer: string) => void;
  showSubredditName: boolean;
}

const PostView = (props: Props) => {
  return <View></View>;
};

export default PostView;
