import { Comment } from "../../../../../shared/interfaces/comment";

export const deleteCommentInTree = (
  votedComment: { path: string[] },
  commentsArray: Comment[],
  pathLength: number,
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
        currentBranch[i].author_username = "[deleted]";
        currentBranch[i].author_id = "";
        currentBranch[i].content = ["<p>[deleted]</p>"];

        return commentsArray;
      } else if (
        currentBranch[i].path.includes(votedComment.path[pathLength - 1])
      ) {
        idxPath.push(i);
        return deleteCommentInTree(
          votedComment,
          commentsArray,
          pathLength + 1,
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
            currentBranch.replies[i].author_username = "[deleted]";
            currentBranch.replies[i].author_id = "";
            currentBranch.replies[i].content = ["<p>[deleted]</p>"];

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
          return deleteCommentInTree(
            votedComment,
            commentsArray,
            pathLength + 1,
            idxPath,
            false
          );
        }
      }
    }
  }
  return commentsArray;
};
