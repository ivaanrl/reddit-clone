export interface Notification {
  id: string;
  reply_id: string;
  original_id: string;
  author_id: string;
  subreddit_name: string;
  user_id: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  comment_content: string[];
  reply_content: string[];
  type: string;
  reply_author_username: string;
  reply_created_at: string;
  post_title: string;
  votes_value: number;
  user_vote: number;
  reply_path: string;
  post_id: string;
}
