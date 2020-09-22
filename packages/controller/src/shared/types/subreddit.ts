import { Post } from "../interfaces/post";

export type subredditState = {
  name: string;
  owner_id: string;
  topics: string[];
  description: string;
  adultContent: boolean;
  joined: number;
  isUserJoined: boolean;
  createdAt: string;
  updatedAt: string;
  mods: string[];
  posts: Post[];
  message: {
    status: number;
    text: string;
  };
  page: number;
  isLoading: boolean;
  hasMorePosts: boolean;
};
