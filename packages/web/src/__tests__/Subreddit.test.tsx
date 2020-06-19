import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { ActionTypes } from "@reddit-clone/controller";
import SubredditConnector from "../modules/subreddit/SubredditConnector";
import { Router, BrowserRouter } from "react-router-dom";

const mockSelector = jest.fn();
const mockDispatch = jest.fn();
const useLocation = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: "/r/nodejs" },
  }),
}));

beforeEach(() => {
  render(
    <BrowserRouter>
      <SubredditConnector />
    </BrowserRouter>
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
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionTypes.GET_SUBREDDIT,
      payload: "nodejs",
    });
  });
});
