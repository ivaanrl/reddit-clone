import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ActionTypes, rootReducer } from "@reddit-clone/controller";
import SubredditConnector from "../modules/subreddit/SubredditConnector";
import { Router, BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { authReducerState } from "@reddit-clone/controller/dist/modules/Redux/reducers/auth";
import SubredditDropdownConnector from "../modules/subredditDropdown/SubredditDropdownConnector";
import SubredditDropdownDefaultSVG from "../shared/svgs/SubredditDropdownDefaultSVG";
import userEvent from "@testing-library/user-event";

const userSubs = [
  { name: "nodejs", adultContent: false },
  { name: "javascript", adultContent: false },
  { name: "reactjs", adultContent: false },
  { name: "learnProgramming", adultContent: false },
  { name: "python", adultContent: false },
];

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}));

const middlewares: any[] = [];
const mockStore = configureMockStore(middlewares);
const initialState: { auth: authReducerState } = {
  auth: {
    username: "ivanrl",
    email: "roldanlusichivan@gmail.com",
    karma: 0,
    userSubs: userSubs,
    message: {
      status: 0,
      text: "0",
    },
  },
};

const store = mockStore(initialState);

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: "/" },
  }),
}));

describe("renders properly in navbar mode", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SubredditDropdownConnector
            isNavbarDropdown={true}
            defaultIcon={<SubredditDropdownDefaultSVG />}
            defaultText="Home"
            useSameWidth={false}
            addToRedirectPath=""
          />
        </BrowserRouter>
      </Provider>
    );
  });

  test("container is present", () => {
    expect(screen.getByRole("subredditDropdown")).not.toBe(null);
  });

  test("options are present", async () => {
    const subredditDropdownContainer = screen.getByRole("subredditDropdown");
    fireEvent.click(subredditDropdownContainer);

    await screen.findByText("MY COMMUNITIES");
    expect(screen.getByText("REDDIT FEEDS")).not.toBe(null);
    const subredditDropdownOptions = screen.getAllByRole(
      "subredditDropdownOption"
    );

    expect(subredditDropdownOptions.length).toBe(5);
  });
});

describe("renders properly on normal mode", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SubredditDropdownConnector
            isNavbarDropdown={false}
            defaultIcon={<SubredditDropdownDefaultSVG />}
            defaultText="Home"
            useSameWidth={false}
            addToRedirectPath=""
          />
        </BrowserRouter>
      </Provider>
    );
  });

  test("container is present", () => {
    expect(screen.getByRole("subredditDropdown")).not.toBe(null);
  });

  test("options are present", async () => {
    const subredditDropdownContainer = screen.getByRole("subredditDropdown");
    fireEvent.click(subredditDropdownContainer);

    await screen.findByText("MY COMMUNITIES");
    const subredditDropdownOptions = screen.getAllByRole(
      "subredditDropdownOption"
    );

    expect(screen.queryByText("REDDIT FEEDS")).toBe(null);

    expect(subredditDropdownOptions.length).toBe(5);
  });
});

describe("links work properly", () => {
  test("on navbar mode", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SubredditDropdownConnector
            isNavbarDropdown={true}
            defaultIcon={<SubredditDropdownDefaultSVG />}
            defaultText="Home"
            useSameWidth={false}
            addToRedirectPath=""
          />
        </BrowserRouter>
      </Provider>
    );

    const subredditDropdownContainer = screen.getByRole("subredditDropdown");
    fireEvent.click(subredditDropdownContainer);

    await screen.findByText("MY COMMUNITIES");
    const subredditDropdownOptions = screen.getAllByRole(
      "subredditDropdownOption"
    );

    fireEvent.click(subredditDropdownOptions[0]);

    expect(location.pathname).toBe("/r/" + userSubs[0].name + "/");

    expect(screen.getByText(userSubs[0].name)).not.toBe(null);
  });

  test("on normal mode", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SubredditDropdownConnector
            isNavbarDropdown={false}
            defaultIcon={<SubredditDropdownDefaultSVG />}
            defaultText="Home"
            useSameWidth={false}
            addToRedirectPath=""
          />
        </BrowserRouter>
      </Provider>
    );

    const subredditDropdownContainer = screen.getByRole("subredditDropdown");
    fireEvent.click(subredditDropdownContainer);

    await screen.findByText("MY COMMUNITIES");
    const subredditDropdownOptions = screen.getAllByRole(
      "subredditDropdownOption"
    );

    fireEvent.click(subredditDropdownOptions[0]);

    expect(location.pathname).toBe("/r/" + userSubs[0].name + "/");
    expect(screen.getByText(userSubs[0].name)).not.toBe(null);
  });
});
