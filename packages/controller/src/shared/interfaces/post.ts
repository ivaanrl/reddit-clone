export interface Post {
  id: string;
  author_id: string;
  author_username: string;
  title: string;
  content: string[] | null;
  createdAt: string;
  updatedAt: string;
  subreddit_name: string;
  votes: string;
  user_vote: number;
  comment_count: number;
  link: string | null;
  type: string;
}
