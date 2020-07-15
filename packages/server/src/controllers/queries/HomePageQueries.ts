import sequelize from "../../models";

export const getHomepagePostsSignedInQuery = async (
  username: string,
  id: string
) => {
  return await sequelize.query(
    `SELECT posts.id, posts.author_id, posts.author_username, posts.title, posts.content,
            posts."createdAt", posts."updatedAt", posts.subreddit_name, COALESCE(votes.vote_count,1) AS votes,
            COALESCE(user_vote.value,0) AS user_vote, COALESCE(comments.comment_count,0) AS comment_count
    FROM posts
    LEFT JOIN (
    SELECT votes.post_id, (SUM(votes.value) +  1) as vote_count
    FROM votes
    GROUP BY votes.post_id
    ) AS votes ON votes.post_id = posts.id
    INNER JOIN (
        SELECT "SubredditName" as subreddit_name FROM users_subreddits
        WHERE username = '${username}'
        ) AS user_subreddits ON user_subreddits.subreddit_name = posts."subreddit_name"
    LEFT JOIN (
        SELECT value, post_id FROM votes
        WHERE author_id = '${id}'
    ) AS user_vote ON user_vote.post_id = posts.id
    INNER JOIN (
        SELECT COUNT(comments.post_id) as comment_count, comments.post_id 
        FROM comments
        GROUP BY comments.post_id 
    ) AS comments ON comments.post_id = posts.id
    ORDER BY (NOW() - posts."createdAt") / vote_count`
  );
};

export const getHomepagePostsSignedOutQuery = async () => {
  return await sequelize.query(
    `SELECT posts.id, posts.author_id, posts.author_username, posts.title, posts.content,
                  posts."createdAt", posts."updatedAt", posts.subreddit_name, 
                  COALESCE(votes.vote_count,1) AS votes, COALESCE(comments.comment_count,0) AS comment_count
              FROM posts
          LEFT JOIN (
          SELECT votes.post_id, (SUM(votes.value) +  1) as vote_count
              FROM votes
              GROUP BY votes.post_id
              ) AS votes ON votes.post_id = posts.id
          INNER JOIN (
              SELECT COUNT(comments.post_id) as comment_count, comments.post_id 
              FROM comments
              GROUP BY comments.post_id 
          ) AS comments ON comments.post_id = posts.id
          ORDER BY (NOW() - posts."createdAt") / vote_count`
  );
};
