export interface subredditPost {
  id: string;
  author_id: string;
  author_username: string;
  title: string;
  content: string[];
  createdAt: string;
  updatedAt: string;
  subreddit_id: string;
  votes: number;
  user_vote: number;
}

export interface subredditInfo {
  name: string;
  ownner_id: string;
  topics: string[];
  description: string;
  joined: boolean;
  createdAt: string;
  adultContent: boolean;
  mods: string[];
  posts: subredditPost[];
}
