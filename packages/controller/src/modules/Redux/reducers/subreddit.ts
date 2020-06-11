import { BaseAction, ActionTypes } from "../actions";

export type subredditState = {
  id: number;
  name: string;
  owner_id: string;
  topics: string[];
  description: string;
  adultContent: boolean;
  joined: number;
  error: number | null;
};

export const subredditReducer = (
  state: subredditState = {
    id: 0,
    name: "",
    owner_id: "",
    topics: [],
    description: "",
    adultContent: false,
    joined: 0,
    error: null,
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_SUBREDDIT_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.GET_SUBREDDIT_FAILED:
      return {
        id: 0,
        name: "",
        owner_id: "",
        topics: [],
        description: "",
        adultContent: false,
        joined: 0,
        error: action.payload,
      };
    default:
      return state;
  }
};
