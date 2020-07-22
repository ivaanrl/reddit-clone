import { BaseAction, ActionTypes } from "../actions";
import { insertIntoTree } from "./helpers/post/insertIntoTree";
import { voteCommentInTree } from "./helpers/post/voteCommentInTree";
import { vote } from "./helpers/vote";
import { Post } from "./subreddit";

export interface homepageReducerState {
  posts: Post[];
  message: {
    status: number;
    text: string;
  };
}

export const homePageReducer = (
  state: homepageReducerState = {
    posts: [],
    message: {
      status: 0,
      text: "",
    },
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_HOMEPAGE_POSTS_COMPLETED:
      return {
        ...state,
        ...action.payload,
        ...{ message: { status: 0, text: "" } },
      };
    case ActionTypes.GET_HOMEPAGE_POSTS_FAILED:
      return {
        ...state,
        ...{
          message: { status: action.payload.status, text: action.payload.text },
        },
      };
    case ActionTypes.UPDATE_HOMEPAGE_POST_VOTES:
      const { index, value } = action.payload;
      const stateCopy = { ...state };
      const postToEdit = stateCopy.posts[index];
      const { user_vote, votes } = vote(
        postToEdit.user_vote,
        value,
        parseInt(postToEdit.votes, 10)
      );

      postToEdit.votes = votes.toString();
      postToEdit.user_vote = user_vote;
      return { ...state, ...stateCopy };
    default:
      return state;
  }
};
