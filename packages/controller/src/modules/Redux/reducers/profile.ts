import { BaseAction, ActionTypes } from "../actions";

export type profileReducerState = {
  userInfo: {
    id: string;
    username: string;
    karma: number;
    createdAt: string;
  };
  posts: {
    id: string;
    subreddit_name: string;
    title: string;
    voteCount: number;
    user_vote: number;
    createdAt: string;
  }[];
  comments: {
    commentId: string;
    commentAuthorId: string;
    commentAuthorUsername: string;
    commentContent: string[];
    commentCreatedAt: string;
    commentVoteValue: number;
    postId: string;
    postSubredditName: string;
    postAuthorUsername: string;
    postTitle: string;
  }[];
  message: {
    status: number;
    text: string;
  };
};

export const profileReducer = (
  state: profileReducerState = {
    userInfo: {
      id: "",
      username: "",
      karma: 0,
      createdAt: "",
    },
    posts: [],
    comments: [],
    message: {
      status: 0,
      text: "",
    },
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_PROFILE_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.GET_PROFILE_POSTS_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.GET_PROFILE_POSTS_FAILED:
      const { status, text } = action.payload;
      return { ...state, ...{ message: { status, text } } };
    case ActionTypes.GET_PROFILE_UPVOTED_POSTS_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.GET_PROFILE_UPVOTED_POSTS_FAILED:
      return {
        ...state,
        ...{
          message: { status: action.payload.status, text: action.payload.text },
        },
      };
    case ActionTypes.GET_PROFILE_DOWNVOTED_POSTS_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.GET_PROFILE_DOWNVOTED_POSTS_FAILED:
      return {
        ...state,
        ...{
          message: { status: action.payload.status, text: action.payload.text },
        },
      };
    case ActionTypes.GET_PROFILE_COMMENTS_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.GET_PROFILE_COMMENTS_FAILED:
      return {
        ...state,
        ...{
          message: { status: action.payload.status, text: action.payload.text },
        },
      };
    case ActionTypes.REPLY_COMMENT_IN_PROFILE_COMPLETED:
      return {
        ...state,
        ...{
          message: { status: action.payload.status, text: action.payload.text },
        },
      };
    case ActionTypes.REMOVE_PROFILE_MESSAGES:
      return {
        ...state,
        message: {
          status: 0,
          text: "",
        },
      };

    case ActionTypes.CLEAR_PROFILE_POSTS:
      return {
        ...state,
        ...{ posts: [], comments: [] },
      };
    default:
      return state;
  }
};
