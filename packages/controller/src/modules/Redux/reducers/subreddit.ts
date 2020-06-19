import { BaseAction, ActionTypes } from "../actions";

export interface Post {
  id: number;
  author_id: string;
  title: string;
  content: string[];
  createdAt: string;
  updatedAt: string;
  subreddit_id: number;
  subreddit_name: string;
  votes: number;
  author_username: string;
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
    default:
      return state;
  }
};
