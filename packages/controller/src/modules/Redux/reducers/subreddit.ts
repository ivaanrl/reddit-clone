import { BaseAction, ActionTypes } from "../actions";

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
      if (postToEdit.user_vote === value) {
        postToEdit.votes = 0;
        postToEdit.user_vote = 0;
      } else if (postToEdit.user_vote === 1 && value === -1) {
        postToEdit.votes = -1;
        postToEdit.user_vote = -1;
      } else if (postToEdit.user_vote === -1 && value === 1) {
        postToEdit.votes = 1;
        postToEdit.user_vote = 1;
      } else {
        postToEdit.votes += value;
        postToEdit.user_vote = value;
      }

      return { ...state, ...stateCopy };
    default:
      return state;
  }
};
