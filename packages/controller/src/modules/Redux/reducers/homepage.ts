import { type } from "os";
import { post } from "superagent";
import { Post } from "../../../shared/interfaces/post";
import { homepageReducerState } from "../../../shared/types/homepage";
import { BaseAction, ActionTypes } from "../actions";
import { insertIntoTree } from "./helpers/post/insertIntoTree";
import { voteCommentInTree } from "./helpers/post/voteCommentInTree";
import { vote } from "./helpers/vote";

export const homePageReducer = (
  state: homepageReducerState = {
    posts: [],
    message: {
      status: 0,
      text: "",
    },
    page: 0,
    isLoading: true,
    hasMorePosts: true,
  },
  action: BaseAction
) => {
  const stateCopy = { ...state };
  switch (action.type) {
    case ActionTypes.GET_HOMEPAGE_POSTS_COMPLETED:
      let statePosts = stateCopy.posts;
      let pages = stateCopy.page;
      pages++;

      const hasMore: boolean = action.payload.hasMore;
      const newPosts: Post[] = action.payload.posts;
      statePosts = statePosts.concat(
        newPosts.filter((post) => statePosts.indexOf(post) < 0)
      );

      return {
        ...state,
        ...{
          posts: statePosts,
          page: pages,
          isLoading: false,
          hasMorePosts: hasMore,
        },
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
    case ActionTypes.SWITCH_HOMEPAGE_LOADING_STATE:
      return { ...state, ...{ isLoading: true } };
    case ActionTypes.CLEAR_HOMEPAGE_POSTS:
      return { ...state, ...{ posts: [], page: 0 } };
    case ActionTypes.SAVE_HOME_POST_COMPLETED:
      const postToSave = stateCopy.posts[action.payload.index];
      postToSave.saved = !postToSave.saved;
      return { ...state, ...stateCopy };
    case ActionTypes.SAVE_HOME_POST_FAILED:
      return {
        ...state,
        ...{
          message: {
            status: action.payload.status,
            text: action.payload.text,
          },
        },
      };
    default:
      return state;
  }
};
