import sequelize from "../../models";

export const getProfilePostsByNewQuery = async (
  currentUserId: string,
  userId: string
) => {
  return await sequelize.query(`
    SELECT posts.id,posts.author_username,posts.title,
    posts."createdAt", posts."updatedAt", posts.subreddit_name,
    COALESCE(vote_sum.value,0) AS "voteCount", 
    COALESCE(user_vote.value,0) AS "user_vote"
    FROM posts
    LEFT JOIN (
        SELECT value, post_id FROM votes
        WHERE author_id='${currentUserId}'
    ) AS user_vote ON user_vote.post_id = posts.id
    LEFT JOIN (
        SELECT SUM(value) as value, post_id FROM votes
        GROUP BY post_id
    ) AS vote_sum ON vote_sum.post_id = posts.id
    WHERE author_id='${userId}'
    ORDER BY "createdAt" DESC
`);
};

export const getProfileUpvotesByNewQuery = async (userId: string) => {
  return await sequelize.query(`
  SELECT posts.id, posts.title, posts."createdAt", posts."updatedAt", 
    posts.subreddit_name, votes.value AS "voteCount", votes.value AS "userVote" 
  FROM votes
  INNER JOIN posts 
    ON votes.post_id = posts.id
  WHERE votes.author_id= '${userId}' AND value = 1
    `);
};

export const getProfileDownvotesByNewQuery = async (userId: string) => {
  return await sequelize.query(`
  SELECT posts.id, posts.title, posts."createdAt", posts."updatedAt", 
    posts.subreddit_name, votes.value AS "voteCount", votes.value AS "userVote" 
  FROM votes
  INNER JOIN posts 
    ON votes.post_id = posts.id
  WHERE votes.author_id= '${userId}' AND value = -1
    `);
};
