import { BaseAction, ActionTypes } from "../actions";
import { insertIntoTree } from "./helpers/post/insertIntoTree";
import { voteCommentInTree } from "./helpers/post/voteCommentInTree";
import { vote } from "./helpers/vote";

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

  message: {
    status: number;
    text: string;
  };
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
    message: {
      status: 0,
      text: "",
    },
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_FULL_POST_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.UPDATE_FULL_POST_VOTES:
      const value = action.payload;
      const stateCopy = { ...state };

      const { user_vote, votes } = vote(
        stateCopy.user_vote,
        value,
        stateCopy.votes
      );

      stateCopy.votes = votes;
      stateCopy.user_vote = user_vote;

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
    case ActionTypes.REMOVE_FULL_POST_ERRORS:
      return {
        ...state,
        message: {
          status: 0,
          text: "",
        },
      };
    default:
      return state;
  }
};
