import { Comment } from "../../post";
import { vote } from "../vote";

export const voteCommentInTree = (
  votedComment: { path: string[] },
  commentsArray: Comment[],
  pathLength: number,
  value: number,
  idxPath: number[] = [],
  firstTry: boolean = true
): Comment[] => {
  if (firstTry) {
    let currentBranch = commentsArray;

    for (let i = 0; i < currentBranch.length; i++) {
      if (
        currentBranch[i].path[1] === votedComment.path[1] &&
        currentBranch[i].path.length === votedComment.path.length
      ) {
        const { user_vote, votes } = vote(
          currentBranch[i].user_vote,
          value,
          currentBranch[i].voteValue
        );
        currentBranch[i].voteValue = votes;
        currentBranch[i].user_vote = user_vote;
        return commentsArray;
      } else if (
        currentBranch[i].path.includes(votedComment.path[pathLength - 1])
      ) {
        idxPath.push(i);
        return voteCommentInTree(
          votedComment,
          commentsArray,
          pathLength + 1,
          value,
          idxPath,
          false
        );
      }
    }
  } else {
    let currentBranch = commentsArray[idxPath[0]];

    for (let j = 1; j < idxPath.length; j++) {
      currentBranch = currentBranch.replies[idxPath[j]];
    }

    for (let i = 0; i < currentBranch.replies.length; i++) {
      if (
        currentBranch.replies[i].path.includes(
          votedComment.path[pathLength - 2]
        )
      ) {
        if (currentBranch.replies[i].path.length === votedComment.path.length) {
          if (
            currentBranch.replies[i].path[votedComment.path.length - 1] ===
            votedComment.path[votedComment.path.length - 1]
          ) {
            const { user_vote, votes } = vote(
              currentBranch.replies[i].user_vote,
              value,
              currentBranch.replies[i].voteValue
            );
            currentBranch.replies[i].voteValue = votes;
            currentBranch.replies[i].user_vote = user_vote;

            return commentsArray;
          } else {
            continue;
          }
        } else if (
          currentBranch.replies[i].path[
            currentBranch.replies[i].path.length - 1
          ] === votedComment.path[currentBranch.replies[i].path.length - 1]
        ) {
          idxPath.push(i);
          return voteCommentInTree(
            votedComment,
            commentsArray,
            pathLength + 1,
            value,
            idxPath,
            false
          );
        }
      }
    }
  }
  return commentsArray;
};
