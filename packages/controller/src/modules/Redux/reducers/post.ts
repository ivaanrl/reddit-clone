import { BaseAction, ActionTypes } from "../actions";
import { insertIntoTree } from "./helpers/post/insertIntoTree";
import { voteCommentInTree } from "./helpers/post/voteCommentInTree";

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
  id: string;
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
    id: "",
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
        stateCopy.votes = stateCopy.votes + stateCopy.user_vote;
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

      const newCommentTree = insertIntoTree(
        newReply,
        stateWithNewReply.comments,
        2
      );

      stateWithNewReply.comments = newCommentTree;

      return { ...state, ...stateWithNewReply };
    case ActionTypes.VOTE_COMMENT_COMPLETED:
      const stateWithNewVote = { ...state };
      const votedComment: { path: string[]; voteValue: number } =
        action.payload;

      const commentTreeWithVote = voteCommentInTree(
        votedComment,
        stateWithNewVote.comments,
        2,
        votedComment.voteValue
      );

      stateWithNewVote.comments = commentTreeWithVote;

      return { ...state, ...stateWithNewVote };

    default:
      return state;
  }
};
