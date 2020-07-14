import { BaseAction, ActionTypes } from "../actions";
import { vote } from "./helpers/vote";

export interface Post {
  id: string;
  author_id: string;
  author_username: string;
  title: string;
  content: string[];
  createdAt: string;
  updatedAt: string;
  subreddit_name: string;
  votes: number;
  user_vote: number;
}

export type subredditState = {
  name: string;
  owner_id: string;
  topics: string[];
  description: string;
  adultContent: boolean;
  joined: number;
  isUserJoined: boolean;
  createdAt: string;
  updatedAt: string;
  mods: string[];
  posts: Post[];
  message: {
    status: number;
    text: string;
  };
};

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
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_SUBREDDIT_COMPLETED:
      return { ...state, ...action.payload };
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
      const stateCopy = { ...state };
      const postToEdit = stateCopy.posts[index];
      const { user_vote, votes } = vote(
        postToEdit.user_vote,
        value,
        postToEdit.votes
      );

      postToEdit.votes = votes;
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
    default:
      return state;
  }
};
