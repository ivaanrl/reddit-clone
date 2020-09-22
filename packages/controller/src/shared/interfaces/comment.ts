export interface Comment {
  path: string[];
  id: string;
  author_id: string;
  author_username: string;
  content: string[];
  post_id?: string;
  comment_id?: string;
  createdAt: string;
  updatedAt: string;
  voteValue: number;
  user_vote: number;
  replies: Comment[];
}
