import { BaseAction, ActionTypes } from "../actions";

export interface Comment {
  path: string[];
  id: string;
  author_id: string;
  author_username: string;
  content: string[];
  post_id?: string;
  comment_id?: string;
  createdAt: string;
  updatedAt: string;
  voteValue: number;
  user_vote: number;
  replies: Comment[];
}

export interface fullPostState {
  id: number;
  author_id: string;
  title: string;
  content: string[];
  createdAt: string;
  updatedAt: string;
  subreddit_name: string;
  votes: number;
  author_username: string;
  user_vote: number;
  comments: Comment[];
}

export const fullPostReducer = (
  state: fullPostState = {
    id: 0,
    author_id: "",
    title: "",
    content: [""],
    createdAt: "",
    updatedAt: "",
    subreddit_name: "",
    votes: 0,
    author_username: "",
    user_vote: 0,
    comments: [],
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_FULL_POST_COMPLETED:
      console.log("get full post");
      return { ...state, ...action.payload };
    case ActionTypes.UPDATE_FULL_POST_VOTES:
      const value = action.payload;
      const stateCopy = { ...state };

      if (value === stateCopy.user_vote) {
        stateCopy.votes = 0;
        stateCopy.user_vote = 0;
      } else if (stateCopy.user_vote === 1 && value === -1) {
        stateCopy.votes = -1;
        stateCopy.user_vote = -1;
      } else if (stateCopy.user_vote === -1 && value === 1) {
        stateCopy.votes = 1;
        stateCopy.user_vote = 1;
      } else {
        stateCopy.votes += value;
        stateCopy.user_vote = value;
      }
      return { ...state, ...stateCopy };
    case ActionTypes.COMMENT_FULL_POST_COMPLETED:
      const newState = { ...state };
      newState.comments.unshift(action.payload);
      return { ...state, ...newState };
    case ActionTypes.REPLY_COMMENT_COMPLETED:
      const stateWithNewReply = { ...state };
      const newReply: Comment = action.payload;

      newReply.path = ((newReply.path as unknown) as string).split(".");

      const newCommentTree = insterIntoTree(
        newReply,
        stateWithNewReply.comments,
        2
      );

      stateWithNewReply.comments = newCommentTree;

      return { ...state, ...stateWithNewReply };

    default:
      return state;
  }
};

const insterIntoTree = (
  newComment: Comment,
  commentsArray: Comment[],
  pathLength: number,
  idxPath: number[] = [],
  firstTry: boolean = true
): Comment[] => {
  if (firstTry) {
    let currentBranch: Comment | Comment[] = commentsArray;
    idxPath.forEach((idx) => {
      if (Array.isArray(currentBranch)) currentBranch = currentBranch[idx];
    });

    for (let i = 0; i < currentBranch.length; i++) {
      if (currentBranch[i].path.includes(newComment.path[pathLength - 1])) {
        idxPath.push(i);
        return insterIntoTree(
          newComment,
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
        currentBranch.replies[i].path.includes(newComment.path[pathLength - 2])
      ) {
        if (
          currentBranch.replies[i].path.length + 1 ===
          newComment.path.length
        ) {
          if (
            currentBranch.replies[i].path[
              currentBranch.replies[i].path.length - 1
            ] === newComment.path[newComment.path.length - 2]
          ) {
            idxPath.push(i);
            return insterIntoTree(
              newComment,
              commentsArray,
              pathLength + 1,
              idxPath,
              false
            );
          } else {
            continue;
          }
        } else {
          idxPath.push(i);
          return insterIntoTree(
            newComment,
            commentsArray,
            pathLength + 1,
            idxPath,
            false
          );
        }
      }
    }

    if (currentBranch.replies.length === 0) {
      currentBranch.replies.push(newComment);
    }
  }

  return commentsArray;
};
