import { Post } from "../interfaces/post";

export type homepageReducerState = {
  posts: Post[];
  message: {
    status: number;
    text: string;
  };
  page: number;
  isLoading: boolean;
  hasMorePosts: boolean;
};
