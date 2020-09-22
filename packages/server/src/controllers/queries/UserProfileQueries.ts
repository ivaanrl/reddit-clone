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

export const PROFILE_POSTS_LIMIT = 10;

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
    SELECT posts.id,posts.author_username,posts.title, posts.author_id, posts.content,posts.link,posts.type,
      posts."createdAt", posts."updatedAt", posts.subreddit_name, COALESCE(comments.comment_count,0) as comment_count,
      COALESCE(vote_sum.vote_count,0) AS "votes", 
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
    LEFT JOIN (
      SELECT COUNT(comments.post_id) as comment_count, comments.post_id
      FROM comments
      GROUP BY comments.post_id
    ) AS comments ON comments.post_id = posts.id
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

export const PROFILE_VOTED_LIMIT = 10;

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

export const PROFILE_COMMENT_LIMIT = 10;

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

export const getNotificationsQuery = async (filter: string, userId: string) => {
  switch (filter) {
    case "all":
      return await getAllNotifications(userId);
    case "unread":
      return await getUnreadNotifications(userId);
    default:
      return await getUnreadNotifications(userId);
  }
};

const getAllNotifications = async (userId: string) => {
  return await sequelize.query(`
  SELECT notifications.id,notifications.reply_id,notifications.original_id,notifications.subreddit_name,
    notifications.user_id, notifications.read, notifications."createdAt", notifications."updatedAt",
    original_comment.content as comment_content, 
    CASE 
      WHEN original_comment.content IS NULL then 'post'
      ELSE 'comment'
    END AS type,
    reply.author_username as reply_author_username, reply."createdAt" as reply_created_at,
    reply.content as reply_content,reply.title as post_title,
    COALESCE(reply.votes_value,0) AS votes_value, COALESCE(reply.user_vote,0) AS user_vote
  FROM notifications
  LEFT JOIN (
    SELECT * FROM comments
    ) AS original_comment ON original_comment.id = notifications.original_id
    INNER JOIN (
    SELECT comments.id,comments.author_username,comments."createdAt",posts.title,comments.content,
      SUM(votes.value) as votes_value, votes.post_id, user_vote.value AS user_vote
    FROM comments
    INNER JOIN posts ON posts.id = post_id
    LEFT JOIN votes ON comments.id = votes.post_id
    LEFT JOIN (
      SELECT value FROM votes
      WHERE author_id='${userId}'
    ) AS user_vote ON comments.id = votes.post_id
	  GROUP BY votes.post_id, comments.id,posts.title, user_vote.value
  ) AS reply ON reply.id = notifications.reply_id
  WHERE user_id='${userId}'`);
};

const getUnreadNotifications = async (userId: string) => {
  return await sequelize.query(`
  SELECT notifications.id,notifications.reply_id,notifications.original_id,notifications.subreddit_name,
    notifications.user_id, notifications.read, notifications."createdAt", notifications."updatedAt",
    original_comment.content as comment_content, 
    CASE 
      WHEN original_comment.content IS NULL then 'post'
      ELSE 'comment'
    END AS type,
    reply.author_username as reply_author_username, reply."createdAt" as reply_created_at,
    reply.content as reply_content,reply.title as post_title,
    COALESCE(reply.votes_value,0) AS votes_value, COALESCE(reply.user_vote,0) AS user_vote
  FROM notifications
  LEFT JOIN (
    SELECT * FROM comments
    ) AS original_comment ON original_comment.id = notifications.original_id
    INNER JOIN (
    SELECT comments.id,comments.author_username,comments."createdAt",posts.title,comments.content,
      SUM(votes.value) as votes_value, votes.post_id, user_vote.value AS user_vote
    FROM comments
    INNER JOIN posts ON posts.id = post_id
    LEFT JOIN votes ON comments.id = votes.post_id
    LEFT JOIN (
      SELECT value FROM votes
      WHERE author_id='${userId}'
    ) AS user_vote ON comments.id = votes.post_id
	  GROUP BY votes.post_id, comments.id,posts.title, user_vote.value
  ) AS reply ON reply.id = notifications.reply_id
  WHERE user_id='${userId}' AND read IS FALSE`);
};
