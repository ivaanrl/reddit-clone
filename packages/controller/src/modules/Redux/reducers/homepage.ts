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
    default:
      return state;
  }
};