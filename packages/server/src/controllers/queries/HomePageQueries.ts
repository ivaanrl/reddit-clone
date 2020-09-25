import sequelize from "../../models";

export const getHomepagePostsQuery = async (
  username: string,
  userId: string,
  order: string,
  sortTime: string,
  page: number
) => {
  switch (order) {
    case "new":
      return await getHomepagePostsByNew(username, userId, page);
    case "hot":
      return await getHomepagePostsByHot(username, userId, page);
    case "top":
      return await getHomepagePostsByTop(username, userId, sortTime, page);
    default:
      return await getHomepagePostsByHot(username, userId, page);
  }
};

export const HOMEPAGE_POSTS_LIMIT = 15;

const GET_HOMEPAGE_POSTS_INITIAL_TEXT = `
SELECT posts.id, posts.author_id, posts.author_username, posts.title, posts.content, posts.link, posts.type,
            posts."createdAt", posts."updatedAt", posts.subreddit_name, COALESCE(votes.vote_count,0) AS votes,
            COALESCE(user_vote.value,0) AS user_vote, COALESCE(comments.comment_count,0) AS comment_count,
            CASE 
              WHEN  saved_posts.id IS NOT NULL then true
              ELSE false
			      END as saved
    FROM posts
    LEFT JOIN (
    SELECT votes.post_id, SUM(votes.value) as vote_count
    FROM votes
    GROUP BY votes.post_id
    ) AS votes ON votes.post_id = posts.id`;

const getHomepagePostsByTop = async (
  username: string,
  id: string,
  sortTime: string,
  page: number
) => {
  const whereQuery = getWhereQuery(sortTime);
  return await sequelize.query(
    `${GET_HOMEPAGE_POSTS_INITIAL_TEXT}
    LEFT JOIN (
        SELECT "SubredditName" as subreddit_name FROM users_subreddits
        WHERE username = '${username}'
        ) AS user_subreddits ON user_subreddits.subreddit_name = posts."subreddit_name"
    LEFT JOIN (
        SELECT value, post_id FROM votes
        WHERE author_id = '${id}'
    ) AS user_vote ON user_vote.post_id = posts.id
    LEFT JOIN (
        SELECT COUNT(comments.post_id) as comment_count, comments.post_id 
        FROM comments
        GROUP BY comments.post_id 
    ) AS comments ON comments.post_id = posts.id
    LEFT JOIN (
      SELECT * FROM saved_posts
      WHERE user_id= '${id}'
    ) AS saved_posts ON saved_posts.post_id = posts.id
    ${whereQuery}
    ORDER BY votes DESC
    LIMIT ${HOMEPAGE_POSTS_LIMIT} OFFSET ${page * HOMEPAGE_POSTS_LIMIT}`
  );
};

const getHomepagePostsByNew = async (
  username: string,
  id: string,
  page: number
) => {
  return await sequelize.query(
    `SELECT posts.id, posts.author_id, posts.author_username, posts.title, posts.content, posts.link, posts.type,
            posts."createdAt", posts."updatedAt", posts.subreddit_name, COALESCE(votes.vote_count,0) AS votes,
            COALESCE(user_vote.value,0) AS user_vote, COALESCE(comments.comment_count,0) AS comment_count,
            CASE 
              WHEN  saved_posts.id IS NOT NULL then true
              ELSE false
			      END as saved
    FROM posts
    LEFT JOIN (
    SELECT votes.post_id, SUM(votes.value) as vote_count
    FROM votes
    GROUP BY votes.post_id
    ) AS votes ON votes.post_id = posts.id
    LEFT JOIN (
        SELECT "SubredditName" as subreddit_name FROM users_subreddits
        WHERE username = '${username}'
        ) AS user_subreddits ON user_subreddits.subreddit_name = posts."subreddit_name"
    LEFT JOIN (
        SELECT value, post_id FROM votes
        WHERE author_id = '${id}'
    ) AS user_vote ON user_vote.post_id = posts.id
    LEFT JOIN (
        SELECT COUNT(comments.post_id) as comment_count, comments.post_id 
        FROM comments
        GROUP BY comments.post_id 
    ) AS comments ON comments.post_id = posts.id
    LEFT JOIN (
      SELECT * FROM saved_posts
      WHERE user_id= '${id}'
    ) AS saved_posts ON saved_posts.post_id = posts.id
    ORDER BY posts."createdAt" DESC
    LIMIT ${HOMEPAGE_POSTS_LIMIT} OFFSET ${page * HOMEPAGE_POSTS_LIMIT}`
  );
};

const getHomepagePostsByHot = async (
  username: string,
  id: string,
  page: number
) => {
  return await sequelize.query(
    `SELECT posts.id, posts.author_id, posts.author_username, posts.title, posts.content,posts.link, posts.type,
            posts."createdAt", posts."updatedAt", posts.subreddit_name, COALESCE(votes.vote_count,0) AS votes,
            COALESCE(user_vote.value,0) AS user_vote, COALESCE(comments.comment_count,0) AS comment_count,
            CASE 
              WHEN  saved_posts.id IS NOT NULL then true
              ELSE false
			      END as saved
    FROM posts
    LEFT JOIN (
    SELECT votes.post_id, SUM(votes.value) as vote_count
    FROM votes
    GROUP BY votes.post_id
    ) AS votes ON votes.post_id = posts.id
    LEFT JOIN (
        SELECT "SubredditName" as subreddit_name FROM users_subreddits
        WHERE username = '${username}'
        ) AS user_subreddits ON user_subreddits.subreddit_name = posts."subreddit_name"
    LEFT JOIN (
        SELECT value, post_id FROM votes
        WHERE author_id = '${id}'
    ) AS user_vote ON user_vote.post_id = posts.id
    LEFT JOIN (
        SELECT COUNT(comments.post_id) as comment_count, comments.post_id 
        FROM comments
        GROUP BY comments.post_id 
    ) AS comments ON comments.post_id = posts.id
    LEFT JOIN (
      SELECT * FROM saved_posts
      WHERE user_id= '${id}'
    ) AS saved_posts ON saved_posts.post_id = posts.id
    ORDER BY SIGN(COALESCE(vote_count,0)) DESC, (NOW() - posts."createdAt") / CASE 
                                                                              COALESCE(vote_count,0) + 1 
                                                                              WHEN 0 THEN -1 
                                                                              ELSE COALESCE(vote_count,0) + 1 
                                                                              END 
      ASC
    LIMIT ${HOMEPAGE_POSTS_LIMIT} OFFSET ${page * HOMEPAGE_POSTS_LIMIT}`
  );
};

const getWhereQuery = (sortTime: string) => {
  switch (sortTime) {
    case "all_time":
      return ``;
    case "this_year":
      return `WHERE posts."createdAt" > NOW() - interval '365' day`;
    case "this_month":
      return `WHERE posts."createdAt" > NOW() - interval '30' day`;
    case "this_week":
      return `WHERE posts."createdAt" > NOW() - interval '7' day`;
    case "today":
      return `WHERE posts."createdAt" > NOW() - interval '1' day`;
    default:
      return ``;
  }
};
