import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { ActionTypes } from "@reddit-clone/controller";
import SubredditConnector from "../modules/subreddit/SubredditConnector";

const mockSelector = jest.fn();
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch,
}));

beforeEach(() => {
  render(<SubredditConnector />);
});

describe("renders properly", () => {
  test("title is present", () => {
    expect(screen.getByTitle("subreddit-name")).not.toBe(null);
  });
});
