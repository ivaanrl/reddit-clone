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
  page: number;
}

export const homePageReducer = (
  state: homepageReducerState = {
    posts: [],
    message: {
      status: 0,
      text: "",
    },
    page: 0,
  },
  action: BaseAction
) => {
  const stateCopy = { ...state };
  switch (action.type) {
    case ActionTypes.GET_HOMEPAGE_POSTS_COMPLETED:
      let statePosts = stateCopy.posts;
      let pages = stateCopy.page;
      pages++;

      const newPosts: Post[] = action.payload.posts;
      statePosts = statePosts.concat(
        newPosts.filter((post) => statePosts.indexOf(post) < 0)
      );

      return {
        ...state,
        ...{ posts: statePosts, page: pages },
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
