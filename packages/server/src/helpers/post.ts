import { Comment } from "../models/Comment";
import { HasManyGetAssociationsMixin } from "sequelize/types";
import { Vote } from "../models/Vote";

/*
public path!: string;
  public id!: string;
  public author_id!: string;
  public author_username!: string;
  public content!: string[];
  public post_id: string;
  public comment_id: string;
*/

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
          const commentVotes = await commentsLeft[j].getVotes();
          let voteValue = 0;
          commentVotes.forEach((vote) => {
            voteValue += vote.value;
            if (vote.author_id === user_id) {
              commentsLeft[i].user_vote = vote.value;
            }
          });
          commentsLeft[i].voteValue = voteValue;
          const newReplies = commentsLeft[j].getDataValue("replies");
          newReplies.push(commentsLeft[i]);
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
