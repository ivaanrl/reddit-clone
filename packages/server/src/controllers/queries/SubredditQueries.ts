import sequelize from "../../models";

export const getSubredditSignedInQuery = async (
  username: string,
  subredditName: string
) => {
  return (await sequelize.query(`
    SELECT subreddits.name as sub_name, subreddits.owner_id, subreddits.topics, subreddits.description,
    subreddits."adultContent", subreddits.private,subreddits."createdAt",
    subreddits."updatedAt", users_subreddits.role, subreddit_mods.mods,user_count.joined
    FROM subreddits 
    LEFT JOIN (
      SELECT COALESCE(role,'') as role, "SubredditName" FROM users_subreddits
      WHERE username='${username}' AND "SubredditName"='${subredditName}'
      ) AS users_subreddits 
      ON users_subreddits."SubredditName" = subreddits.name
    INNER JOIN(
      SELECT  array_agg(username) as mods FROM users_subreddits
      WHERE (role='own' OR role='adm') AND "SubredditName"='${subredditName}'
      ) AS subreddit_mods 
      ON users_subreddits."SubredditName" = subreddits.name
    INNER JOIN(
      SELECT COUNT(DISTINCT username) as joined , "SubredditName"  FROM users_subreddits
      WHERE "SubredditName"='${subredditName}'
      GROUP BY "SubredditName"
      ) AS user_count ON user_count."SubredditName" = subreddits.name
    WHERE subreddits.name='${subredditName}'`)) as [
    {
      sub_name: string;
      owner_id: string;
      topics: string[];
      description: string;
      adultContent: boolean;
      private: boolean;
      createdAt: string;
      updatedAt: string;
      role: string;
      mods: string[];
      joined: number;
    }[],
    unknown[]
  ];
};

export const getSubredditPostsSignedInQuery = async (
  userId: string,
  subredditName: string
) => {
  return (await sequelize.query(`
    SELECT posts.id, posts.author_id, posts.author_username, posts.title,
          posts.content, posts."createdAt", posts."updatedAt", posts.subreddit_name,
          COALESCE(vote_count,1) as votes, COALESCE(user_vote,0) as user_vote,
          COALESCE(comment_count,1) as comment_count
    FROM posts
    LEFT JOIN (
      SELECT votes.post_id, SUM(votes.value) as vote_count
      FROM votes
      GROUP BY votes.post_id
    ) AS votes on votes.post_id = posts.id
    LEFT JOIN (
      SELECT COALESCE(value,0) as user_vote, post_id FROM votes
      WHERE author_id = '${userId}'
    ) AS user_vote ON user_vote.post_id = posts.id
    LEFT JOIN (
      SELECT COUNT(comments.post_id) as comment_count, comments.post_id
      FROM comments
      GROUP BY comments.post_id
    ) AS comments ON comments.post_id = posts.id
    WHERE subreddit_name='${subredditName}'`)) as [
    {
      id: string;
      author_id: string;
      author_username: string;
      title: string;
      content: string[];
      createdAt: string;
      updatedAt: string;
      subreddit_name: string;
      votes: string;
      user_vote: number;
    }[],
    unknown[]
  ];
};
