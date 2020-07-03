import { Comment } from "../models/Comment";

export class CommentWithReply extends Comment {
  public user_vote!: number;
  public voteValue!: number;
  public replies!: CommentWithReply[];
}

export const getChildren = async (
  commentsLeft: CommentWithReply[],
  pathLength: number,
  user_id: string
): Promise<CommentWithReply[]> => {
  if (pathLength < 2) {
    return commentsLeft;
  }

  for (let i = 0; i < commentsLeft.length; i++) {
    if (commentsLeft[i].path.length === pathLength) {
      for (let j = 0; j < commentsLeft.length; j++) {
        if (commentsLeft[i].comment_id === commentsLeft[j].id) {
          if (commentsLeft[j].path.length === 2) {
            const commentVotes = await commentsLeft[j].getVotes();
            let voteValue = 0;
            commentVotes.forEach((vote) => {
              voteValue += vote.value;
              if (vote.author_id === user_id) {
                commentsLeft[j].setDataValue("user_vote", vote.value);
              }
            });

            commentsLeft[j].setDataValue("voteValue", voteValue);
          }

          const commentVotes = await commentsLeft[i].getVotes();
          let voteValue = 0;
          commentVotes.forEach((vote) => {
            voteValue += vote.value;
            if (vote.author_id === user_id) {
              commentsLeft[i].setDataValue("user_vote", vote.value);
            }
          });

          commentsLeft[i].setDataValue("voteValue", voteValue);
          const newReplies = commentsLeft[j].getDataValue("replies");
          newReplies.push(commentsLeft[i]);

          newReplies.sort((a, b) =>
            a.voteValue > b.voteValue ? 1 : b.voteValue > a.voteValue ? -1 : 0
          );
          commentsLeft[j].setDataValue("replies", newReplies);
          commentsLeft.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }

  return getChildren(commentsLeft, pathLength - 1, user_id);
};
