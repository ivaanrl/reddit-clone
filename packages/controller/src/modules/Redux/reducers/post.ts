import { BaseAction, ActionTypes } from "../actions";

export interface fullPostState {
  id: number;
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

export const fullPostReducer = (
  state: fullPostState = {
    id: 0,
    author_id: "",
    title: "",
    content: [""],
    createdAt: "",
    updatedAt: "",
    subreddit_name: "",
    votes: 0,
    author_username: "",
    user_vote: 0,
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_FULL_POST_COMPLETED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
