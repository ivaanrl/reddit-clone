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
  comments: string[][];
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
    comments: [],
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_FULL_POST_COMPLETED:
      console.log("get full post");
      return { ...state, ...action.payload };
    case ActionTypes.UPDATE_FULL_POST_VOTES:
      const value = action.payload;
      const stateCopy = { ...state };

      if (value === stateCopy.user_vote) {
        stateCopy.votes = 0;
        stateCopy.user_vote = 0;
      } else if (stateCopy.user_vote === 1 && value === -1) {
        stateCopy.votes = -1;
        stateCopy.user_vote = -1;
      } else if (stateCopy.user_vote === -1 && value === 1) {
        stateCopy.votes = 1;
        stateCopy.user_vote = 1;
      } else {
        stateCopy.votes += value;
        stateCopy.user_vote = value;
      }
      return { ...state, ...stateCopy };
    case ActionTypes.COMMENT_FULL_POST_COMPLETED:
      const newState = { ...state };
      newState.comments.unshift(action.payload);
      return { ...state, ...newState };
    default:
      return state;
  }
};
