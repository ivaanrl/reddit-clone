import { BaseAction, ActionTypes } from "../actions";
import { vote } from "./helpers/vote";

export interface Post {
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
}

export type subredditState = {
  name: string;
  owner_id: string;
  topics: string[];
  description: string;
  adultContent: boolean;
  joined: number;
  createdAt: string;
  updatedAt: string;
  mods: string[];
  posts: Post[];
  error: number | null;
};

export const subredditReducer = (
  state: subredditState = {
    name: "",
    owner_id: "",
    topics: [],
    description: "",
    adultContent: false,
    joined: 0,
    mods: [],
    posts: [],
    createdAt: "",
    updatedAt: "",
    error: null,
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_SUBREDDIT_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.GET_SUBREDDIT_FAILED:
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
        error: action.payload,
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
    default:
      return state;
  }
};
