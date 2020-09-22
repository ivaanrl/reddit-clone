import { Comment } from "../../../../../shared/interfaces/comment";

export const insertIntoTree = (
  newComment: Comment,
  commentsArray: Comment[],
  pathLength: number,
  idxPath: number[] = [],
  firstTry: boolean = true
): Comment[] => {
  if (firstTry) {
    //currentBranch represents the branch of the tree that I'm currently working with
    let currentBranch: Comment | Comment[] = commentsArray;

    for (let i = 0; i < currentBranch.length; i++) {
      //select parent comment based on path
      if (
        currentBranch[i].path[1] === newComment.path[1] &&
        currentBranch[i].path.length === newComment.path.length
      ) {
        currentBranch[i].replies.push(newComment);
        return commentsArray;
      } else if (
        currentBranch[i].path.includes(newComment.path[pathLength - 1])
      ) {
        idxPath.push(i);
        return insertIntoTree(
          newComment,
          commentsArray,
          pathLength + 1,
          idxPath,
          false
        );
      }
    }
  } else {
    //any run that is not the first one
    let currentBranch = commentsArray[idxPath[0]];
    for (let j = 1; j < idxPath.length; j++) {
      //go to proper currentBranch by using previously store idxPath
      currentBranch = currentBranch.replies[idxPath[j]];
    }

    for (let i = 0; i < currentBranch.replies.length; i++) {
      if (
        //check if the current reply on the analized branch has a compatible path with the new comment
        currentBranch.replies[i].path.includes(newComment.path[pathLength - 2])
      ) {
        if (
          //if this is true, we are in the parent comment of the comment that will hold the reply
          //currentBranch.replies ---> replies[i] ---> replies.push(newComment)
          currentBranch.replies[i].path.length + 1 ===
          newComment.path.length
        ) {
          if (
            //check that current reply path matches newCommentPath
            currentBranch.replies[i].path[
              currentBranch.replies[i].path.length - 1
            ] === newComment.path[newComment.path.length - 2]
          ) {
            currentBranch.replies[i].replies.push(newComment);
            return commentsArray;
          } else {
            continue;
          }
        } else if (
          //if current branch path is too short, and matches the new comment
          //run the function again with new index
          currentBranch.replies[i].path[
            currentBranch.replies[i].path.length - 1
          ] === newComment.path[currentBranch.replies[i].path.length - 1]
        ) {
          //store current position in idxPath
          idxPath.push(i);
          return insertIntoTree(
            newComment,
            commentsArray,
            pathLength + 1,
            idxPath,
            false
          );
        } else {
          continue;
        }
      }
    }
  }

  return commentsArray; //Just to make typescript happy
};
