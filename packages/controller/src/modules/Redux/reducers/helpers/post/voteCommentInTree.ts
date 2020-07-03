import { Comment } from "../../post";

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
        if (value === currentBranch[i].user_vote) {
          currentBranch[i].voteValue =
            currentBranch[i].voteValue + currentBranch[i].user_vote;
          currentBranch[i].user_vote = 0;
        } else if (currentBranch[i].user_vote === 1 && value === -1) {
          currentBranch[i].voteValue = -1;
          currentBranch[i].user_vote = -1;
        } else if (currentBranch[i].user_vote === -1 && value === 1) {
          currentBranch[i].voteValue = 1;
          currentBranch[i].user_vote = 1;
        } else {
          currentBranch[i].voteValue += value;
          currentBranch[i].user_vote = value;
        }
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
            if (value === currentBranch.replies[i].user_vote) {
              currentBranch.replies[i].voteValue =
                currentBranch.replies[i].voteValue +
                currentBranch.replies[i].user_vote;
              currentBranch.replies[i].user_vote = 0;
            } else if (
              currentBranch.replies[i].user_vote === 1 &&
              value === -1
            ) {
              currentBranch.replies[i].voteValue = -1;
              currentBranch.replies[i].user_vote = -1;
            } else if (
              currentBranch.replies[i].user_vote === -1 &&
              value === 1
            ) {
              currentBranch.replies[i].voteValue = 1;
              currentBranch.replies[i].user_vote = 1;
            } else {
              currentBranch.replies[i].voteValue += value;
              currentBranch.replies[i].user_vote = value;
            }
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
