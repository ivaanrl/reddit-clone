import sequelize from "../../models";

export const getCommentsWithVotesQuery = async (
  userId: string,
  postId: string
) => {
  return (await sequelize.query(`
    SELECT comments.path, comments.id, comments.author_id, comments.author_username,
    comments.content, comments.post_id, comments.comment_id, comments."createdAt",
    comments."updatedAt", COALESCE(user_vote.value,0) AS user_vote, COALESCE(vote_sum.value,0) as "voteValue"
    FROM comments
    LEFT JOIN
    (
      SELECT value, post_id FROM votes
      WHERE author_id = '${userId}'
      ) as user_vote ON user_vote.post_id = comments.id
      LEFT JOIN (
        SELECT SUM(value) as value, post_id FROM votes
        GROUP BY post_id
        ) as vote_sum ON vote_sum.post_id = comments.id
        WHERE path <@ '${postId}'
        `)) as [
    {
      path: string | string[];
      id: string;
      author_id: string;
      author_username: string;
      content: string[];
      post_id: string;
      comment_id: string;
      createdAt: string;
      updatedAt: string;
      user_vote: number;
      voteValue: number;
    }[],
    unknown[]
  ];
};
