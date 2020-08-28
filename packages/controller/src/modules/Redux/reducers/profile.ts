import { BaseAction, ActionTypes } from "../actions";
import { vote } from "./helpers/vote";
import { Post } from "./subreddit";

export type profileReducerState = {
  userInfo: {
    id: string;
    username: string;
    karma: number;
    createdAt: string;
  };
  posts: Post[];
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
  isLoading: boolean;
  hasMore: boolean;
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
    isLoading: true,
    hasMore: true,
  },
  action: BaseAction
) => {
  const stateCopy = { ...state };
  switch (action.type) {
    case ActionTypes.GET_PROFILE_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.GET_PROFILE_POSTS_COMPLETED:
      let statePosts = stateCopy.posts;
      let pages = stateCopy.page;
      pages++;

      const hasMore = action.payload.hasMore;

      const newPosts: Post[] = action.payload.posts;
      statePosts = statePosts.concat(
        newPosts.filter((post) => statePosts.indexOf(post) < 0)
      );

      return {
        ...state,
        ...{
          posts: statePosts,
          page: pages,
          isLoading: false,
          hasMore: hasMore,
        },
      };
    case ActionTypes.GET_PROFILE_POSTS_FAILED:
      const { status, text } = action.payload;
      return { ...state, ...{ message: { status, text } } };
    case ActionTypes.GET_PROFILE_UPVOTED_POSTS_COMPLETED:
      let stateUpvotedPosts = stateCopy.posts;
      let upvotedPages = stateCopy.page;
      upvotedPages++;

      const hasMoreUpvoted = action.payload.hasMore;

      const newUpvotedPosts: Post[] = action.payload.posts;
      stateUpvotedPosts = stateUpvotedPosts.concat(
        newUpvotedPosts.filter((post) => stateUpvotedPosts.indexOf(post) < 0)
      );

      return {
        ...state,
        ...{
          posts: stateUpvotedPosts,
          page: upvotedPages,
          isLoading: false,
          hasMore: hasMoreUpvoted,
        },
      };
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

      const hasMoreDownvoted = action.payload.hasMore;

      const newDownvotedPosts: Post[] = action.payload.posts;
      stateUpvotedPosts = stateDownvotedPosts.concat(
        newDownvotedPosts.filter((post) => stateUpvotedPosts.indexOf(post) < 0)
      );

      return {
        ...state,
        ...{
          posts: stateUpvotedPosts,
          page: downvotedPages,
          isLoading: false,
          hasMore: hasMoreDownvoted,
        },
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

      const hasMoreComments = action.payload.hasMore;

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
        ...{
          comments: stateComments,
          page: commentsPage,
          isLoading: false,
          hasMore: hasMoreComments,
        },
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
        ...{ posts: [], comments: [], page: 0, hasMore: true },
      };
    case ActionTypes.UPDATE_PROFILE_POST_VOTES:
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
    case ActionTypes.SWITCH_PROFILE_LOADING_STATE:
      //const loadingState = stateCopy.isLoading;
      return { ...state, ...{ isLoading: true } };
    default:
      return state;
  }
};
