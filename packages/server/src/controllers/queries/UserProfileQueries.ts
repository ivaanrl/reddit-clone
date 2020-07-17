import sequelize from "../../models";

export const getProfilePostsQuery = async (
  currentUserId: string,
  userId: string,
  order: string,
  sortTime: string
) => {
  switch (order) {
    case "new":
      return await getProfilePostsByNew(currentUserId, userId);
    case "hot":
      return await getProfilePostByHot(currentUserId, userId);
    case "top":
      return await getProfilePostsByTop(currentUserId, userId, sortTime);
    default:
      return await getProfilePostsByNew(currentUserId, userId);
  }
};

const getProfilePostsByTop = async (
  currentUserId: string,
  userId: string,
  sortTime: string
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
  `);
};

const getWhereQuery = (sortTime: string, userId: string) => {
  console.log(sortTime);
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

const getProfilePostByHot = async (currentUserId: string, userId: string) => {
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
  `);
};

const getProfilePostsByNew = async (currentUserId: string, userId: string) => {
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
`);
};

export const getProfileVotedPostQuery = async (
  userId: string,
  order: string,
  sortTime: string,
  value: number
) => {
  switch (order) {
    case "new":
      return await getProfileVotedPostsByNew(userId, value);
    case "top":
      return await getProfileVotedPostsByTop(userId, sortTime, value);
    case "hot":
      return await getProfileVotedPostsByHot(userId, value);
    default:
      return await getProfileVotedPostsByNew(userId, value);
  }
};

export const getProfileVotedPostsByNew = async (
  userId: string,
  value: number
) => {
  return await sequelize.query(`
  SELECT DISTINCT posts.id, posts.title, posts."createdAt", posts."updatedAt", 
    posts.subreddit_name, votes.value AS "voteCount", votes.value AS "userVote" 
  FROM votes
  INNER JOIN posts 
    ON votes.post_id = posts.id
  WHERE votes.author_id= '${userId}' AND value = ${value}
  ORDER BY "createdAt" DESC
    `);
};

export const getProfileVotedPostsByHot = async (
  userId: string,
  value: number
) => {
  return await sequelize.query(`
  SELECT  posts.id, posts.title, posts."createdAt", posts."updatedAt", 
    posts.subreddit_name, votes.value AS "voteCount", votes.value AS "userVote" 
  FROM votes
  INNER JOIN posts 
    ON votes.post_id = posts.id
  WHERE votes.author_id= '${userId}' AND value = ${value}
  ORDER BY (NOW() - posts."createdAt") / votes.value DESC
    `);
};

export const getProfileVotedPostsByTop = async (
  userId: string,
  sortTime: string,
  value: number
) => {
  const whereQuery = getWhereQuery(sortTime, userId);

  return await sequelize.query(`
  SELECT DISTINCT posts.id, posts.title, posts."createdAt", posts."updatedAt", 
    posts.subreddit_name, votes.value AS "voteCount", votes.value AS "userVote" 
  FROM votes
  INNER JOIN posts 
    ON votes.post_id = posts.id
  ${whereQuery} AND value = ${value}
  ORDER BY votes.value DESC
    `);
};

export const getProfileCommentsQuery = async (
  userId: string,
  order: string,
  sortTime: string
) => {
  console.log(sortTime);
  switch (order) {
    case "new":
      return await getProfileCommentsByNew(userId);
    case "top":
      return await getProfileCommentsByTop(userId, sortTime);

    case "hot":
      return await getProfileCommentsByHot(userId);
    default:
      return await getProfileCommentsByNew(userId);
  }
};

const getProfileCommentsByTop = async (userId: string, sortTime: string) => {
  const whereQuery = getWhereQuery(sortTime, userId);

  return (await sequelize.query(`
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
  ON comments.post_id = posts.id
  ${whereQuery}
  ORDER BY "commentVoteValue" DESC
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

const getProfileCommentsByNew = async (userId: string) => {
  return (await sequelize.query(`
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
  ON comments.post_id = posts.id
  WHERE comments.author_id = '${userId}'
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

const getProfileCommentsByHot = async (userId: string) => {
  return (await sequelize.query(`
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
  ON comments.post_id = posts.id
  WHERE comments.author_id = '${userId}'
  ORDER BY (NOW() - comments."createdAt") / COALESCE(votes.votes_value,1) DESC
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
