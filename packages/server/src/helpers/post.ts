import { Comment } from "../models/Comment";

export const getCommentsReplies = async (comments: Comment[]) => {
  const replies = await Promise.all(
    comments.map(async (comment) => {
      return await comment.getComments();
    })
  );
  const nestedReplies = await Promise.all(
    replies.map(async (reply) => {
      return await reply.getComments();
    })
  );
};
