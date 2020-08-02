import React from "react";
import { render, screen } from "@testing-library/react";
import { ActionTypes, rootReducer } from "@reddit-clone/controller";
import SubredditConnector from "../modules/subreddit/SubredditConnector";
import { Router, BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const middlewares: any[] = [];
const mockStore = configureMockStore(middlewares);
const initialState = {
  auth: {
    username: "ivanrl",
    email: "roldanlusichivan@gmail.com",
    karma: 0,
    userSubs: [],
    message: {
      status: 0,
      text: 0,
    },
  },
  subreddit: {
    name: "nodejs",
    owner_id: "",
    topic: [],
    description: "",
    adultContent: false,
    joined: 1,
    isUserJoined: true,
    createdAt: "2020-06-18T15:46:47.121-03",
    updatedAt: "2020-06-18T15:46:47.121-03",
    mods: ["ivanrl"],
    message: {
      status: 0,
      text: "",
    },
    page: 0,
    isLoading: true,
    hasMorePosts: true,
  },
  homepage: {
    page: 0,
  },
  profile: {
    page: 0,
  },
};

const store = mockStore(initialState);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: "/r/nodejs" },
  }),
  useLocation: () => ({
    pathname: "/r/nodejs/",
    search: "",
  }),
}));

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SubredditConnector />
      </BrowserRouter>
    </Provider>
  );
});

describe("renders properly", () => {
  test("displays subreddit title", () => {
    expect(screen.getByTitle("subreddit-name")).not.toBe(null);
  });

  test("displays subreddit picture", () => {
    expect(screen.getByTitle("subreddit-photo")).not.toBe(null);
  });

  test("displays subreddit handle", () => {
    expect(screen.getByTitle("subreddit-handle")).not.toBe(null);
  });

  test("displays subreddit description", () => {
    expect(screen.getByTitle("subreddit-description")).not.toBe(null);
  });

  test("displays subreddit moderators", () => {
    expect(screen.getByTitle("subreddit-moderators")).not.toBe(null);
  });

  test("displays subreddit posts", () => {
    expect(screen.getByTitle("posts")).not.toBe(null);
  });

  test("calls API for subreddit info", () => {
    /*expect(store.dispatch).toHaveBeenCalledWith({
      type: ActionTypes.GET_SUBREDDIT,
      payload: { subName: "nodejs", page: "0", time: "all_time", order: "hot" },
    }); */
  });
});
