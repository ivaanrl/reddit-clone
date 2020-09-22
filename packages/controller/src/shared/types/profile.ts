import { Post } from "../interfaces/post";

export type profileReducerState = {
  userInfo: {
    id: string;
    username: string;
    karma: number;
    createdAt: string;
  };
  posts: Post[];
  comments: {
    commentId: string;
    commentAuthorId: string;
    commentAuthorUsername: string;
    commentContent: string[];
    commentCreatedAt: string;
    commentVoteValue: number;
    postId: string;
    postSubredditName: string;
    postAuthorUsername: string;
    postTitle: string;
  }[];
  message: {
    status: number;
    text: string;
  };
  page: 0;
  isLoading: boolean;
  hasMore: boolean;
};
