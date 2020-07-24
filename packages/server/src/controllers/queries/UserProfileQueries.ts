import sequelize from "../../models";

export const getProfilePostsQuery = async (
  currentUserId: string,
  userId: string,
  order: string,
  sortTime: string,
  page: number
) => {
  switch (order) {
    case "new":
      return await getProfilePostsByNew(currentUserId, userId, page);
    case "hot":
      return await getProfilePostByHot(currentUserId, userId, page);
    case "top":
      return await getProfilePostsByTop(currentUserId, userId, sortTime, page);
    default:
      return await getProfilePostsByNew(currentUserId, userId, page);
  }
};

const PROFILE_POSTS_LIMIT = 10;

const getProfilePostsByTop = async (
  currentUserId: string,
  userId: string,
  sortTime: string,
  page: number
) => {
  const whereQuery = getWhereQuery(sortTime, userId);

  return await sequelize.query(`
  SELECT posts.id,posts.author_username,posts.title,
  posts."createdAt", posts."updatedAt", posts.subreddit_name,
  COALESCE(vote_sum.vote_count,0) AS "voteCount", 
  COALESCE(user_vote.value,0) AS "user_vote"
  FROM posts
  LEFT JOIN (
      SELECT value, post_id FROM votes
      WHERE author_id='${currentUserId}'
  ) AS user_vote ON user_vote.post_id = posts.id
  LEFT JOIN (
      SELECT SUM(value) as vote_count, post_id FROM votes
      GROUP BY post_id
  ) AS vote_sum ON vote_sum.post_id = posts.id
  ${whereQuery}
  ORDER BY vote_count DESC
  LIMIT ${PROFILE_POSTS_LIMIT} OFFSET ${page * PROFILE_POSTS_LIMIT}
  `);
};

const getWhereQuery = (sortTime: string, userId: string) => {
  switch (sortTime) {
    case "all_time":
      return `WHERE posts.author_id='${userId}'`;
    case "this_year":
      return `WHERE posts.author_id='${userId}' AND posts."createdAt" > NOW() - interval '365' day`;
    case "this_month":
      return `WHERE posts.author_id='${userId}' AND posts."createdAt" > NOW() - interval '30' day`;
    case "this_week":
      return `WHERE posts.author_id='${userId}' AND posts."createdAt" > NOW() - interval '7' day`;
    case "today":
      return `WHERE posts.author_id='${userId}' AND posts."createdAt" > NOW() - interval '1' day`;
    default:
      return `WHERE posts.author_id='${userId}'`;
  }
};

const getProfilePostByHot = async (
  currentUserId: string,
  userId: string,
  page: number
) => {
  return await sequelize.query(`
  SELECT posts.id,posts.author_username,posts.title,
  posts."createdAt", posts."updatedAt", posts.subreddit_name,
  COALESCE(vote_sum.vote_count,0) AS "voteCount", 
  COALESCE(user_vote.value,0) AS "user_vote"
  FROM posts
  LEFT JOIN (
      SELECT value, post_id FROM votes
      WHERE author_id='${currentUserId}'
  ) AS user_vote ON user_vote.post_id = posts.id
  LEFT JOIN (
      SELECT SUM(value) as vote_count, post_id FROM votes
      GROUP BY post_id
  ) AS vote_sum ON vote_sum.post_id = posts.id
  WHERE author_id='${userId}'
  ORDER BY (NOW() - posts."createdAt") / vote_count DESC
  LIMIT ${PROFILE_POSTS_LIMIT} OFFSET ${page * PROFILE_POSTS_LIMIT}
  `);
};

const getProfilePostsByNew = async (
  currentUserId: string,
  userId: string,
  page: number
) => {
  return await sequelize.query(`
    SELECT posts.id,posts.author_username,posts.title,
    posts."createdAt", posts."updatedAt", posts.subreddit_name,
    COALESCE(vote_sum.vote_count,0) AS "voteCount", 
    COALESCE(user_vote.value,0) AS "user_vote"
    FROM posts
    LEFT JOIN (
        SELECT value, post_id FROM votes
        WHERE author_id='${currentUserId}'
    ) AS user_vote ON user_vote.post_id = posts.id
    LEFT JOIN (
        SELECT SUM(value) as vote_count, post_id FROM votes
        GROUP BY post_id
    ) AS vote_sum ON vote_sum.post_id = posts.id
    WHERE author_id='${userId}'
    ORDER BY "createdAt" DESC
    LIMIT ${PROFILE_POSTS_LIMIT} OFFSET ${page * PROFILE_POSTS_LIMIT}
`);
};

export const getProfileVotedPostQuery = async (
  userId: string,
  order: string,
  sortTime: string,
  value: number,
  page: number
) => {
  switch (order) {
    case "new":
      return await getProfileVotedPostsByNew(userId, value, page);
    case "top":
      return await getProfileVotedPostsByTop(userId, sortTime, value, page);
    case "hot":
      return await getProfileVotedPostsByHot(userId, value, page);
    default:
      return await getProfileVotedPostsByNew(userId, value, page);
  }
};

const GET_PROFILE_VOTED_INITIAL_TEXT = `
SELECT DISTINCT posts.id, posts.title, posts."createdAt", posts."updatedAt", 
  posts.subreddit_name, votes.value AS "voteCount", votes.value AS "user_vote" 
FROM votes
INNER JOIN posts 
ON votes.post_id = posts.id`;

const PROFILE_VOTED_LIMIT = 10;

export const getProfileVotedPostsByNew = async (
  userId: string,
  value: number,
  page: number
) => {
  return await sequelize.query(`
  ${GET_PROFILE_VOTED_INITIAL_TEXT}
  WHERE votes.author_id= '${userId}' AND value = ${value}
  ORDER BY "createdAt" DESC
  LIMIT ${PROFILE_VOTED_LIMIT} OFFSET ${page * PROFILE_VOTED_LIMIT}
    `);
};

export const getProfileVotedPostsByHot = async (
  userId: string,
  value: number,
  page: number
) => {
  return await sequelize.query(`
  ${GET_PROFILE_VOTED_INITIAL_TEXT}
  WHERE votes.author_id= '${userId}' AND value = ${value}
  ORDER BY (NOW() - posts."createdAt") / votes.value DESC
  LIMIT ${PROFILE_VOTED_LIMIT} OFFSET ${page * PROFILE_VOTED_LIMIT}
    `);
};

export const getProfileVotedPostsByTop = async (
  userId: string,
  sortTime: string,
  value: number,
  page: number
) => {
  const whereQuery = getWhereQuery(sortTime, userId);

  return await sequelize.query(`
  ${GET_PROFILE_VOTED_INITIAL_TEXT}
  ${whereQuery} AND value = ${value}
  ORDER BY votes.value DESC
  LIMIT ${PROFILE_VOTED_LIMIT} OFFSET ${page * PROFILE_VOTED_LIMIT}
    `);
};

export const getProfileCommentsQuery = async (
  userId: string,
  order: string,
  sortTime: string,
  page: number
) => {
  switch (order) {
    case "new":
      return await getProfileCommentsByNew(userId, page);
    case "top":
      return await getProfileCommentsByTop(userId, sortTime, page);
    case "hot":
      return await getProfileCommentsByHot(userId, page);
    default:
      return await getProfileCommentsByNew(userId, page);
  }
};

const PROFILE_COMMENT_INITIAL_TEXT = `
SELECT comments.id AS "commentId", comments.author_id AS "commentAuthorId",
  comments.author_username AS "commentAuthorUsername",
  comments.content AS "commentContent", comments."createdAt" AS "commentCreatedAt",
  COALESCE(votes.votes_value,0) AS "commentVoteValue", posts.id AS "postId", 
  posts.subreddit_name AS "postSubredditName",
  posts.author_username AS "postAuthorUsername", posts.title AS "postTitle"
FROM comments 
LEFT JOIN(
  SELECT SUM(votes.value) as votes_value, votes.post_id FROM votes
  GROUP BY votes.post_id
) AS votes ON votes.post_id = comments.id
INNER JOIN posts 
ON comments.post_id = posts.id`;

const PROFILE_COMMENT_LIMIT = 10;

const getProfileCommentsByTop = async (
  userId: string,
  sortTime: string,
  page: number
) => {
  const whereQuery = getWhereQuery(sortTime, userId);

  return (await sequelize.query(`
  ${PROFILE_COMMENT_INITIAL_TEXT}
  ${whereQuery}
  ORDER BY "commentVoteValue" DESC
  LIMIT ${PROFILE_COMMENT_LIMIT} OFFSET ${page * PROFILE_COMMENT_LIMIT}
  `)) as [
    {
      commentId: string;
      commentAuthorId: string;
      commentAuthorUsername: string;
      commentContent: string;
      commentCreatedAt: string;
      commentVoteValue: string;
      postId: string;
      postSubredditName: string;
      postAuthorUsername: string;
      postTitle: string;
    }[],
    unknown[]
  ];
};

const getProfileCommentsByNew = async (userId: string, page: number) => {
  return (await sequelize.query(`
  ${PROFILE_COMMENT_INITIAL_TEXT}
  WHERE comments.author_id = '${userId}'
  LIMIT ${PROFILE_COMMENT_LIMIT} OFFSET ${page * PROFILE_COMMENT_LIMIT}
  `)) as [
    {
      commentId: string;
      commentAuthorId: string;
      commentAuthorUsername: string;
      commentContent: string;
      commentCreatedAt: string;
      commentVoteValue: string;
      postId: string;
      postSubredditName: string;
      postAuthorUsername: string;
      postTitle: string;
    }[],
    unknown[]
  ];
};

const getProfileCommentsByHot = async (userId: string, page: number) => {
  return (await sequelize.query(`
  ${PROFILE_COMMENT_INITIAL_TEXT}
  WHERE comments.author_id = '${userId}'
  ORDER BY (NOW() - comments."createdAt") / COALESCE(votes.votes_value,1) DESC
  LIMIT ${PROFILE_COMMENT_LIMIT} OFFSET ${page * PROFILE_COMMENT_LIMIT}
  `)) as [
    {
      commentId: string;
      commentAuthorId: string;
      commentAuthorUsername: string;
      commentContent: string;
      commentCreatedAt: string;
      commentVoteValue: string;
      postId: string;
      postSubredditName: string;
      postAuthorUsername: string;
      postTitle: string;
    }[],
    unknown[]
  ];
};
