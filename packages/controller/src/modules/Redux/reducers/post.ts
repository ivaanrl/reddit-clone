import { fullPostState } from "../../../shared/types/fullPost";
import { BaseAction, ActionTypes } from "../actions";
import { insertIntoTree } from "./helpers/post/insertIntoTree";
import { voteCommentInTree } from "./helpers/post/voteCommentInTree";
import { vote } from "./helpers/vote";
import { Comment } from "../../../shared/interfaces/comment";
import { deleteCommentInTree } from "./helpers/post/deleteCommentInTree";

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
    type: "",
    link: null,
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
        ...{
          message: {
            status: 0,
            text: "",
          },
        },
      };
    case ActionTypes.DELETE_POST_COMPLETED_ACTION:
      return {
        ...state,
        ...{
          message: {
            status: 204,
            text: "Post deleted successfully",
          },
          content: ["[deleted]"],
          author_id: "",
          author_username: "[deleted]",
          link: null,
          type: "post",
        },
      };
    case ActionTypes.DELETE_POST_FAILED:
      return {
        ...state,
        ...{
          message: { status: action.payload.status, text: action.payload.text },
        },
      };
    case ActionTypes.DELETE_COMMENT_FAILED:
      return {
        ...state,
        ...{
          message: { status: action.payload.status, text: action.payload.text },
        },
      };
    case ActionTypes.DELETE_COMMENT_COMPLETED_ACTION:
      const stateWithDeletedComment = { ...state };
      const deletedComment: { path: string[] } = { path: action.payload };

      const commentTreeWithDelete = deleteCommentInTree(
        deletedComment,
        stateWithDeletedComment.comments,
        2
      );

      stateWithDeletedComment.comments = commentTreeWithDelete;

      return { ...state, ...stateWithDeletedComment };
    default:
      return state;
  }
};
