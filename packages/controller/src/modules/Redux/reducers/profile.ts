import { BaseAction, ActionTypes } from "../actions";
import { vote } from "./helpers/vote";

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
    voteCount: string;
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
  page: 0;
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
    page: 0,
  },
  action: BaseAction
) => {
  const stateCopy = { ...state };
  switch (action.type) {
    case ActionTypes.GET_PROFILE_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.GET_PROFILE_POSTS_COMPLETED:
      let statePosts = stateCopy.posts;
      let Pages = stateCopy.page;
      Pages++;

      const newPosts: {
        id: string;
        subreddit_name: string;
        title: string;
        voteCount: string;
        user_vote: number;
        createdAt: string;
      }[] = action.payload.posts;
      statePosts = statePosts.concat(
        newPosts.filter((post) => statePosts.indexOf(post) < 0)
      );

      return {
        ...state,
        ...{ posts: statePosts, page: Pages },
      };
    case ActionTypes.GET_PROFILE_POSTS_FAILED:
      const { status, text } = action.payload;
      return { ...state, ...{ message: { status, text } } };
    case ActionTypes.GET_PROFILE_UPVOTED_POSTS_COMPLETED:
      let stateUpvotedPosts = stateCopy.posts;
      let upvotedPages = stateCopy.page;
      upvotedPages++;

      const newUpvotedPosts: {
        id: string;
        subreddit_name: string;
        title: string;
        voteCount: string;
        user_vote: number;
        createdAt: string;
      }[] = action.payload.posts;
      stateUpvotedPosts = stateUpvotedPosts.concat(
        newUpvotedPosts.filter((post) => stateUpvotedPosts.indexOf(post) < 0)
      );

      return { ...state, ...{ posts: stateUpvotedPosts, page: upvotedPages } };
    case ActionTypes.GET_PROFILE_UPVOTED_POSTS_FAILED:
      return {
        ...state,
        ...{
          message: { status: action.payload.status, text: action.payload.text },
        },
      };
    case ActionTypes.GET_PROFILE_DOWNVOTED_POSTS_COMPLETED:
      let stateDownvotedPosts = stateCopy.posts;
      let downvotedPages = stateCopy.page;
      downvotedPages++;

      const newDownvotedPosts: {
        id: string;
        subreddit_name: string;
        title: string;
        voteCount: string;
        user_vote: number;
        createdAt: string;
      }[] = action.payload.posts;
      stateUpvotedPosts = stateDownvotedPosts.concat(
        newDownvotedPosts.filter((post) => stateUpvotedPosts.indexOf(post) < 0)
      );

      return {
        ...state,
        ...{ posts: stateUpvotedPosts, page: downvotedPages },
      };
    case ActionTypes.GET_PROFILE_DOWNVOTED_POSTS_FAILED:
      return {
        ...state,
        ...{
          message: { status: action.payload.status, text: action.payload.text },
        },
      };
    case ActionTypes.GET_PROFILE_COMMENTS_COMPLETED:
      let stateComments = [...stateCopy.comments];
      let commentsPage = stateCopy.page;
      commentsPage++;

      const newComments: {
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
      }[] = action.payload.comments;
      stateComments = stateComments.concat(
        newComments.filter((post) => stateComments.indexOf(post) < 0)
      );

      return {
        ...state,
        ...{ comments: stateComments, page: commentsPage },
      };
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
        ...{ posts: [], comments: [], page: 0 },
      };
    case ActionTypes.UPDATE_PROFILE_POST_VOTES:
      const { index, value } = action.payload;
      const postToEdit = stateCopy.posts[index];
      const { user_vote, votes } = vote(
        postToEdit.user_vote,
        value,
        parseInt(postToEdit.voteCount, 10)
      );

      postToEdit.voteCount = votes.toString();
      postToEdit.user_vote = user_vote;
      return { ...state, ...stateCopy };
    default:
      return state;
  }
};
