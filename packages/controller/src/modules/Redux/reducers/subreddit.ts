import { Post } from "../../../shared/interfaces/post";
import { subredditState } from "../../../shared/types/subreddit";
import { BaseAction, ActionTypes } from "../actions";
import { vote } from "./helpers/vote";

export const subredditReducer = (
  state: subredditState = {
    name: "",
    owner_id: "",
    topics: [],
    description: "",
    adultContent: false,
    joined: 0,
    isUserJoined: false,
    mods: [],
    posts: [],
    createdAt: "",
    updatedAt: "",
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
    case ActionTypes.GET_SUBREDDIT_COMPLETED:
      const subredditInfo = action.payload;
      let statePosts = stateCopy.posts;
      let pages = stateCopy.page;
      pages++;
      const hasMore = subredditInfo.hasMore;
      let newPosts: Post[] = subredditInfo.posts;

      statePosts = statePosts.concat(
        newPosts.filter((post) => statePosts.indexOf(post) < 0)
      );

      return {
        ...state,
        ...action.payload,
        ...{
          posts: statePosts,
          page: pages,
          isLoading: false,
          hasMorePosts: hasMore,
        },
      };
    case ActionTypes.GET_SUBREDDIT_FAILED:
      const { status, text } = action.payload;
      return {
        name: "",
        owner_id: "",
        topics: [],
        description: "",
        adultContent: false,
        joined: 0,
        createdAt: "",
        updatedAt: "",
        mods: [],
        posts: [],
        message: { status, text },
      };
    case ActionTypes.CREATE_SUBREDDIT_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.UPDATE_POST_VOTES:
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
    case ActionTypes.JOIN_LEAVE_SUBREDDIT_COMPLETED:
      return { ...state, ...{ isUserJoined: action.payload } };
    case ActionTypes.REMOVE_SUBREDDIT_ERRORS:
      return {
        ...state,
        message: {
          text: "",
          status: 0,
        },
      };
    case ActionTypes.SWITCH_SUBREDDIT_LOADING_STATE:
      return { ...state, ...{ isLoading: true } };
    case ActionTypes.CLEAR_SUBREDDIT_POSTS:
      return { ...state, ...{ posts: [], page: 0 } };
    default:
      return state;
  }
};
