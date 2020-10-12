import { Comment } from "../interfaces/comment";

export interface fullPostState {
  id: string;
  author_id: string;
  title: string;
  content: string[];
  createdAt: string;
  updatedAt: string;
  subreddit_name: string;
  votes: number;
  author_username: string;
  user_vote: number;
  type: string;
  link: string |null;
  comments: Comment[];
  message: {
    status: number;
    text: string;
  };
}
