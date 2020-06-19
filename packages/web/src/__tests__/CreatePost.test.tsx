import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { ActionTypes } from "@reddit-clone/controller";
import SubredditConnector from "../modules/subreddit/SubredditConnector";
import { Router, BrowserRouter } from "react-router-dom";
import CreatePostConnector from "../modules/createpost/CreatePostConnector";

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

/*beforeEach(() => {
  window.getSelection()?.removeAllRanges();
  render(
    <BrowserRouter>
      <CreatePostConnector />
    </BrowserRouter>
  );
});

describe("renders properly", () => {
  test("displays create posts container", () => {
    expect(screen.getByTitle("create-post-container")).not.toBe(null);
  });
});
*/

test("", () => {});
