import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { authReducerState } from "@reddit-clone/controller/dist/modules/Redux/reducers/auth";
import { profileReducerState } from "@reddit-clone/controller/dist/modules/Redux/reducers/profile";
import uniqid from "uniqid";
import faker from "faker";
import ProfileCommentsConnector from "../../modules/profile/ui/profileComments/ProfileCommentsConnector";
import { ActionTypes } from "@reddit-clone/controller";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}));

const userId = uniqid();
const profileUsername = "ivanrl";

const middlewares: any[] = [];
const mockStore = configureMockStore(middlewares);
const initialState: {
  profile: profileReducerState;
  subreddit: { page: 0 };
  homepage: { page: 0 };
} = {
  subreddit: {
    page: 0,
  },
  homepage: {
    page: 0,
  },
  profile: {
    userInfo: {
      username: profileUsername,
      id: userId,
      karma: 20,
      createdAt: "2020-06-18T15:46:47.121-03",
    },
    posts: [],
    message: {
      status: 0,
      text: "",
    },
    page: 0,
    isLoading: true,
    hasMore: true,
    comments: [
      /*{
        commentId: uniqid(),
        commentAuthorId: userId,
        commentAuthorUsername: profileUsername,
        commentContent: [
          faker.lorem.sentence(5),
          faker.lorem.sentence(5),
          faker.lorem.sentence(5),
        ],
        commentCreatedAt: "2020-06-18T15:46:47.121-03",
        commentVoteValue: 10,
        postId: uniqid(),
        postSubredditName: faker.lorem.word(),
        postAuthorUsername: faker.internet.userName(),
        postTitle: faker.lorem.sentence(5),
      },
      {
        commentId: uniqid(),
        commentAuthorId: userId,
        commentAuthorUsername: profileUsername,
        commentContent: [
          faker.lorem.sentence(5),
          faker.lorem.sentence(5),
          faker.lorem.sentence(5),
        ],
        commentCreatedAt: "2020-06-18T15:46:47.121-03",
        commentVoteValue: 10,
        postId: uniqid(),
        postSubredditName: faker.lorem.word(),
        postAuthorUsername: faker.internet.userName(),
        postTitle: faker.lorem.sentence(5),
      },
      {
        commentId: uniqid(),
        commentAuthorId: userId,
        commentAuthorUsername: profileUsername,
        commentContent: [
          faker.lorem.sentence(5),
          faker.lorem.sentence(5),
          faker.lorem.sentence(5),
        ],
        commentCreatedAt: "2020-06-18T15:46:47.121-03",
        commentVoteValue: 10,
        postId: uniqid(),
        postSubredditName: faker.lorem.word(),
        postAuthorUsername: faker.internet.userName(),
        postTitle: faker.lorem.sentence(5),
      },
      {
        commentId: uniqid(),
        commentAuthorId: userId,
        commentAuthorUsername: profileUsername,
        commentContent: [
          faker.lorem.sentence(5),
          faker.lorem.sentence(5),
          faker.lorem.sentence(5),
        ],
        commentCreatedAt: "2020-06-18T15:46:47.121-03",
        commentVoteValue: 10,
        postId: uniqid(),
        postSubredditName: faker.lorem.word(),
        postAuthorUsername: faker.internet.userName(),
        postTitle: faker.lorem.sentence(5),
      }, */
    ],
  },
};

const store = mockStore(initialState);

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: "/u/ivanrl/comments" },
  }),
  useLocation: () => ({
    pathname: "/u/ivanrl/comments",
    search: "",
  }),
}));

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ProfileCommentsConnector />
      </BrowserRouter>
    </Provider>
  );
});

describe("renders properly", () => {
  test("shows loading while fetching comments", () => {
    expect(screen.queryAllByRole("loading-post")).not.toBe(null);
  });

  test("should send redux action to get profile comments", async () => {
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionTypes.GET_PROFILE_COMMENTS,
      payload: {
        order: "new",
        page: 0,
        time: "all_time",
        username: "ivanrl",
      },
    });
  });
});
