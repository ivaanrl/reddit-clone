import sequelize from "../../models";

export const getSubredditSignedInQuery = async (
  username: string,
  subredditName: string
) => {
  return (await sequelize.query(`
    SELECT subreddits.name as sub_name, subreddits.owner_id, subreddits.topics, subreddits.description,
    subreddits."adultContent", subreddits.private,subreddits."createdAt",
    subreddits."updatedAt", COALESCE(users_subreddits.role, '') AS role,
    subreddit_mods.mods, user_count.joined
    FROM subreddits 
    LEFT JOIN (
      SELECT role, "SubredditName" FROM users_subreddits
      WHERE username='${username}' AND "SubredditName"='${subredditName}'
      ) AS users_subreddits 
      ON users_subreddits."SubredditName" = subreddits.name
    INNER JOIN(
      SELECT  array_agg(username) as mods, "SubredditName" FROM users_subreddits
        WHERE (role='own' OR role='mod') AND "SubredditName"='${subredditName}'
        GROUP BY "SubredditName"
      ) AS subreddit_mods 
      ON subreddit_mods."SubredditName" = subreddits.name
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

export const getSubredditPostsQuery = async (
  userId: string,
  subredditName: string,
  order: string,
  sortTime: string,
  page: number
) => {
  switch (order) {
    case "new":
      return await getSubredditPostsByNew(userId, subredditName, page);
    case "hot":
      return await getSubredditPostsByHot(userId, subredditName, page);
    case "top":
      return await getSubredditPostsByTop(
        userId,
        subredditName,
        sortTime,
        page
      );
    default:
      return await getSubredditPostsByHot(userId, subredditName, page);
  }
};

const GET_SUBREDDIT_POSTS_INITIAL_TEXT = `
SELECT posts.id, posts.author_id, posts.author_username, posts.title,
          posts.content, posts."createdAt", posts."updatedAt", posts.subreddit_name,
          posts.link, posts.type, COALESCE(vote_count,0) as votes,
          COALESCE(user_vote,0) as user_vote,
          COALESCE(comment_count,0) as comment_count,
          CASE 
              WHEN  saved_posts.id IS NOT NULL then true
              ELSE false
			    END as saved
    FROM posts
    LEFT JOIN (
      SELECT votes.post_id, SUM(votes.value) as vote_count
      FROM votes
      GROUP BY votes.post_id
    ) AS votes on votes.post_id = posts.id`;

export const SUBREDDIT_POSTS_LIMIT = 10;

const getSubredditPostsByHot = async (
  userId: string,
  subredditName: string,
  page: number
) => {
  return (await sequelize.query(`
    ${GET_SUBREDDIT_POSTS_INITIAL_TEXT}
    LEFT JOIN (
      SELECT COALESCE(value,0) as user_vote, post_id FROM votes
      WHERE author_id = '${userId}'
    ) AS user_vote ON user_vote.post_id = posts.id
    LEFT JOIN (
      SELECT COUNT(comments.post_id) as comment_count, comments.post_id
      FROM comments
      GROUP BY comments.post_id
    ) AS comments ON comments.post_id = posts.id
    LEFT JOIN (
      SELECT * FROM saved_posts
      WHERE user_id= '${userId}'
    ) AS saved_posts ON saved_posts.post_id = posts.id
    WHERE subreddit_name='${subredditName}' 
    ORDER BY SIGN(COALESCE(vote_count,0)) DESC, (NOW() - posts."createdAt") / CASE
                                                                            COALESCE(vote_count,0) + 1 
                                                                            WHEN 0 THEN -1 
                                                                            ELSE COALESCE(vote_count,0) + 1 
                                                                            END 
      ASC
      LIMIT ${SUBREDDIT_POSTS_LIMIT} OFFSET ${page * SUBREDDIT_POSTS_LIMIT}
    `)) as [
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

const getSubredditPostsByNew = async (
  userId: string,
  subredditName: string,
  page: number
) => {
  return (await sequelize.query(`
  ${GET_SUBREDDIT_POSTS_INITIAL_TEXT}
    LEFT JOIN (
      SELECT COALESCE(value,0) as user_vote, post_id FROM votes
      WHERE author_id = '${userId}'
    ) AS user_vote ON user_vote.post_id = posts.id
    LEFT JOIN (
      SELECT COUNT(comments.post_id) as comment_count, comments.post_id
      FROM comments
      GROUP BY comments.post_id
    ) AS comments ON comments.post_id = posts.id
    LEFT JOIN (
      SELECT * FROM saved_posts
      WHERE user_id= '${userId}'
    ) AS saved_posts ON saved_posts.post_id = posts.id
    WHERE subreddit_name='${subredditName}' 
    ORDER BY posts."createdAt" DESC
    LIMIT ${SUBREDDIT_POSTS_LIMIT} OFFSET ${
    page * SUBREDDIT_POSTS_LIMIT
  }`)) as [
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

const getSubredditPostsByTop = async (
  userId: string,
  subredditName: string,
  sortTime: string,
  page: number
) => {
  const whereQuery = getWhereQuery(sortTime);
  return (await sequelize.query(`
  ${GET_SUBREDDIT_POSTS_INITIAL_TEXT}
    LEFT JOIN (
      SELECT COALESCE(value,0) as user_vote, post_id FROM votes
      WHERE author_id = '${userId}'
    ) AS user_vote ON user_vote.post_id = posts.id
    LEFT JOIN (
      SELECT COUNT(comments.post_id) as comment_count, comments.post_id
      FROM comments
      GROUP BY comments.post_id
    ) AS comments ON comments.post_id = posts.id
    LEFT JOIN (
      SELECT * FROM saved_posts
      WHERE user_id= '${userId}'
    ) AS saved_posts ON saved_posts.post_id = posts.id
    ${whereQuery} subreddit_name='${subredditName}' 
    ORDER BY vote_count DESC
    LIMIT ${SUBREDDIT_POSTS_LIMIT} OFFSET ${
    page * SUBREDDIT_POSTS_LIMIT
  }`)) as [
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

const getWhereQuery = (sortTime: string) => {
  switch (sortTime) {
    case "all_time":
      return `WHERE`;
    case "this_year":
      return `WHERE posts."createdAt" > NOW() - interval '365' day AND`;
    case "this_month":
      return `WHERE posts."createdAt" > NOW() - interval '30' day AND`;
    case "this_week":
      return `WHERE posts."createdAt" > NOW() - interval '7' day AND`;
    case "today":
      return `WHERE posts."createdAt" > NOW() - interval '1' day AND`;
    default:
      return `WHERE`;
  }
};
