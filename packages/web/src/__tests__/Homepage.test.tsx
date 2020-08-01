import configureMockStore from "redux-mock-store";
import {
  render,
  fireEvent,
  screen,
  waitForElement,
} from "@testing-library/react";
import HomepageConnector from "../modules/homepage/HomepageConnector";
import { Provider } from "react-redux";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ActionTypes } from "@reddit-clone/controller";

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
        <HomepageConnector />
      </BrowserRouter>
    </Provider>
  );
});

describe("it renders properly", () => {
  test("sidebar renders", () => {
    const siderbarContainer = screen.getByTitle("sidebar");
    expect(siderbarContainer).not.toBe(null);

    const createCommunitySidebar = screen.getByTitle("create-container");
    expect(createCommunitySidebar).not.toBe(null);
  });

  test("post container renders", () => {
    const postsContainer = screen.getByTitle("posts");
    expect(postsContainer).not.toBe(null);
  });

  test("order bar renders", () => {
    const orderBarContainer = screen.getByTitle("order-bar-container");
    expect(orderBarContainer).not.toBe(null);
  });

  test("call api for posts on render", () => {
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionTypes.GET_HOMEPAGE_POSTS,
      payload: {
        page: 0,
        order: "hot",
        time: "all_time",
      },
    });
  });
});
